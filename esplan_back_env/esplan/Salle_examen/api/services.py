from django.utils import timezone
from datetime import timedelta, time, datetime
from Session.models import Session
from Examen.models import Examen
from Salle.models import Salle
from Salle_examen.models import Salle_examen
from django.db import IntegrityError

def affectation_examens_salles(session_id=None):
    if session_id:
        session = Session.objects.filter(id_session=session_id).first()
        if not session:
            print(f"Aucune session trouvée avec l'ID {session_id}.")
            return
    else:
        session = Session.objects.first()  # Par défaut, on choisit la première session si aucune session n'est spécifiée

    if not session:
        print("Aucune session trouvée.")
        return

    current_date = session.date_d

    # Réinitialiser les salles disponibles et supprimer les assignations existantes
    Salle.objects.update(dispo=True)
    Salle_examen.objects.all().delete()

    exams = Examen.objects.filter(id_session=session).order_by('type_examen', '-nbrclasse')

    if not exams.exists():
        print(f"Aucun examen trouvé pour la session {session}.")
        return

    while current_date <= session.date_f:
        if current_date.weekday() in [5, 6]:  # Ignorer les week-ends
            current_date += timedelta(days=1)
            continue

        Salle.objects.update(dispo=True)  # Réinitialiser la disponibilité des salles au début de chaque journée

        exams_pratiques = exams.filter(type_examen='pratique')
        exams_theoriques = exams.filter(type_examen='theorique')

        # Assigner les examens pratiques
        for exam in exams_pratiques:
            assigned_classes = Salle_examen.objects.filter(id_examen=exam).count()

            for _ in range(exam.nbrclasse - assigned_classes):
                available_rooms = Salle.objects.filter(dispo=True)

                if available_rooms.exists():
                    room = available_rooms.first()
                    exam_time = timezone.make_aware(datetime.combine(current_date, time(9, 0)))

                    try:
                        Salle_examen.objects.create(
                            id_salle=room,
                            id_examen=exam,
                            date_salle=exam_time
                        )
                        room.dispo = False
                        room.save()
                    except IntegrityError as e:
                        print(f"Erreur d'intégrité pour l'examen {exam} dans la salle {room}: {e}")
                else:
                    print(f"Pas assez de salles disponibles pour l'examen pratique {exam}.")
                    break

        # Assigner les examens théoriques
        exam_time = timezone.make_aware(datetime.combine(current_date, time(9, 0)))

        for exam in exams_theoriques:
            assigned_classes = Salle_examen.objects.filter(id_examen=exam).count()

            for _ in range(exam.nbrclasse - assigned_classes):
                if exam_time.time() < time(17, 0):  # Vérifie si l'heure ne dépasse pas 17h
                    available_rooms = Salle.objects.filter(dispo=True)

                    if available_rooms.exists():
                        room = available_rooms.first()

                        try:
                            Salle_examen.objects.create(
                                id_salle=room,
                                id_examen=exam,
                                date_salle=exam_time
                            )
                            room.dispo = False
                            room.save()
                            exam_time += timedelta(hours=2)  # Ajouter 2 heures pour le prochain créneau
                        except IntegrityError as e:
                            print(f"Erreur d'intégrité pour l'examen {exam} dans la salle {room}: {e}")
                    else:
                        print(f"Pas de salles disponibles pour l'examen théorique {exam}.")
                        break
                else:
                    print("L'heure d'examen théorique dépasse la limite de 17h.")
                    break

        # Passer à la journée suivante
        current_date += timedelta(days=1)

    print(f'Examens affectés aux salles pour la session {session.nom_session} avec succès.')
