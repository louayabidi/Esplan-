import { lazy } from "react";
import { Navigate } from "react-router-dom";



//import PrivateRoute from "../components/dashboard/PrivateRoute";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const LoadingScreenTest = lazy(() => import("../views/LoadingScreenTest.js"));

/***** Pages ****/
const Starter = lazy(() => import("../views/Starter.js"));
const Login = lazy(() => import("../components/dashboard/login.js"));
const ForgotPassword = lazy(() => import("../components/dashboard/ForgotPassword.js"));
const ResetPassword = lazy(() => import("../components/dashboard/ResetPassword.js"));


const AddUser = lazy(() => import("../components/Users/addUser.js"));
const UserList = lazy(() => import("../components/Users/UserList.js"));
const UserUpdate = lazy(() => import("../components/Users/UpdateUser.js"));
const UserDelete = lazy(() => import("../components/Users/DeleteUser.js"));
const Profile = lazy(() => import("../components/Users/profile.js"));


const SessionList = lazy(() => import("../components/Session/SessionList.js"));
const AddSession = lazy(() => import("../components/Session/addSession.js"));
const SessionUpdate = lazy(() => import("../components/Session/UpdateSession.js"));
const SessionDelete = lazy(() => import("../components/Session/DeleteSession.js"));

const ModuleList = lazy(() => import("../components/Module/ModuleList.js"));
const AddModule = lazy(() => import("../components/Module/addModule.js"));
const ModuleUpdate = lazy(() => import("../components/Module/UpdateModule.js"));
const ModuleDelete = lazy(() => import("../components/Module/DeleteModule.js"));


const ExamenList = lazy(() => import("../components/Examen/ExamenList.js"));
const AddExamen = lazy(() => import("../components/Examen/addExamen.js"));
const ExamenUpdate = lazy(() => import("../components/Examen/UpdateExamen.js"));
const ExamenDelete = lazy(() => import("../components/Examen/DeleteExamen.js"));

const AddNiveau = lazy(() => import("../components/Niveau/CreateNiveau.js"));
const DeleteNiveau = lazy(() => import("../components/Niveau/DeleteNiveau.js"));
const NiveauList = lazy(() => import("../components/Niveau/NiveauList.js"));
const EditNiveau = lazy(() => import("../components/Niveau/UpdateNiveau.js"));


const AddClass = lazy(() => import("../components/Classe/CreateClass.js"));
const DeleteClass = lazy(() => import("../components/Classe/DeleteClasse.js"));
const EditClass = lazy(() => import("../components/Classe/UpdateClass.js"));
const ClassList = lazy(() => import("../components/Classe/ClassList.js"));

const AddContrainte = lazy(() => import("../components/Contrainte/AddContrainte.js"));
const ContrainteList = lazy(() => import("../components/Contrainte/ContrainteList.js"));
const ContrainteUpdate = lazy(() => import("../components/Contrainte/UpdateContrainte.js"));

const AddDepartement = lazy(() => import("../components/Departement/addDep.js"));
const DepartementList = lazy(() => import("../components/Departement/DepartementList.js"));
const DepUpdate = lazy(() => import("../components/Departement/UpdateDep.js"));
//const DeleteDep = lazy(() => import("../components/Departement/DeleteDep.js"));

const AddUnite = lazy(() => import("../components/Unité/AddUnite.js"));
const UniteList = lazy(() => import("../components/Unité/UniteList.js"));
const UnitUpdate = lazy(() => import("../components/Unité/UpdateUnite.js"));

const AddBloc  = lazy(() => import("../components/Bloc/addBloc.js"));
const BlocList = lazy(() => import("../components/Bloc/BlocList.js"));
const BlocUpdate = lazy(() => import("../components/Bloc/UpdateBloc.js"));
const DeleteBloc = lazy(() => import("../components/Bloc/DeleteBloc.js"));

const AddSalle  = lazy(() => import("../components/Salle/addSalle.js"));
const SalleList = lazy(() => import("../components/Salle/SalleList.js"));
const SalleUpdate = lazy(() => import("../components/Salle/UpdateSalle.js"));
const DeleteSalle = lazy(() => import("../components/Salle/DeleteSalle.js"));

const AddSalle_examen  = lazy(() => import("../components/Salle_examen/addSalle_examen.js"));
const Salle_examenList = lazy(() => import("../components/Salle_examen/Salle_examenList.js"));
const DeleteSalle_examen = lazy(() => import("../components/Salle_examen/DeleteSalle_examen.js"));
const UpdateSalle_examen = lazy(() => import("../components/Salle_examen/update_salle_ex.js"));

const AddModule_niveau  = lazy(() => import("../components/Module_niveau/addModule_niveau.js"));
const Module_niveauList = lazy(() => import("../components/Module_niveau/Module_niveauList.js"));
const DeleteModule_niveau = lazy(() => import("../components/Module_niveau/DeleteModule_niveau.js"));

const BoxComponent = lazy(() => import("../components/Examen/BoxComponent.js"));
const BoxComponentUp = lazy(() => import("../components/Unité/BoxComponentUp.js"));
const BoxComponentCl = lazy(() => import("../components/Classe/boxComponentCl.js"));
const BoxComponentBl = lazy(() => import("../components/Bloc/boxComponentBl.js"));


const SurveillanceList = lazy(() => import("../components/Surveillance/SurveillanceList.js"));
const AddSurveillance = lazy(() => import("../components/Surveillance/AddSurveillance.js"));
const UpdateSurveillance = lazy(() => import("../components/Surveillance/UpdateSurveillance.js"));
const DeleteSurveillance = lazy(() => import("../components/Surveillance/DeleteSurveillance.js"));



const NotFound = lazy(() => import("../components/NotFound.js"));



/*const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));*/

/*****Routes******/
const ThemeRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/login" /> },
      { path: "/starter", element: <Starter /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "reset-password/:user_id/:token/", element: <ResetPassword /> },


      { path: "/addUser", element: <AddUser /> },
      { path: "/user-list", exact: true, element:<UserList /> }, // Ajouter la route ici
      { path: "/user-up/:user_id", exact: true, element:< UserUpdate/> }, // Ajouter la route ici
      { path: "/user-del/:user_id", exact: true, element:< UserDelete/> }, // Ajouter la route ici
      { path: "/profile", element: <Profile/> },
      

      { path: "/session-list", exact: true, element:<SessionList /> }, // Ajouter la route ici
      { path: "/addSession", element: <AddSession /> },
      { path: "/session-up/:id_session", exact: true, element:< SessionUpdate/> }, // Ajouter la route ici
      { path: "/session-del/:id_session", exact: true, element:< SessionDelete/> }, // Ajouter la route ici

      { path: "/module-list", exact: true, element:<ModuleList /> }, // Ajouter la route ici
      { path: "/addModule", element: <AddModule /> },
      { path: "/module-up/:id_module", exact: true, element:< ModuleUpdate/> }, // Ajouter la route ici
      { path: "/module-del/:id_module", exact: true, element:< ModuleDelete/> }, // Ajouter la route ici

      { path: "/examen-list", exact: true, element:<ExamenList /> }, // Ajouter la route ici
      { path: "/addExamen", element: <AddExamen /> },
      { path: "/examen-up/:id_examen", exact: true, element:< ExamenUpdate/> }, // Ajouter la route ici
      { path: "/examen-del/:id_examen", exact: true, element:< ExamenDelete/> }, // Ajouter la route ici

      { path: "/createNiveau", element: <AddNiveau/> },
      { path: "/deleteNiveau/:id_niveau", element: <DeleteNiveau/> },
      { path: "/niveau-update/:id_niveau", element: <EditNiveau/> },
      { path: "/NiveauList", element: <NiveauList/> },

      { path: "/createClass", element: <AddClass/> },
      { path: "/deleteClass/:id_classe", element: <DeleteClass/> },
      { path: "/Class-update/:id_classe", element: <EditClass/> },
      { path: "/ClasseList", element: <ClassList/> },

      { path: "/DepartementList", element: <DepartementList /> },
      { path: "/addDep", element: <AddDepartement /> },
      { path:"/update-departement/:id_departement", exact: true, element: <DepUpdate /> },
     // { path: "/depp-del/:id_departement", element: <PrivateRoute element={<DeleteDep />} /> },

      { path: "/addContrainte", element: <AddContrainte /> },
      { path: "/ContrainteList", exact: true, element: <ContrainteList /> },
      { path:"/update-contrainte/:id_contrainte", exact: true, element: <ContrainteUpdate /> },

      { path:"/update-unite/:id_unite", exact: true, element: <UnitUpdate /> },
      { path: "/addUnite", element: <AddUnite /> },
      { path: "/UniteList", exact: true, element: <UniteList /> },
      
      { path: "/addBloc", element: <AddBloc /> },
      { path: "/bloc-list", exact: true, element:<BlocList /> }, // Ajouter la route ici
      { path: "/bloc-up/:id_bloc", exact: true, element:< BlocUpdate/> }, // Ajouter la route ici
      { path: "/bloc-del/:id_bloc", exact: true, element:< DeleteBloc/> }, // Ajouter la route ici
      
      { path: "/addSalle", element: <AddSalle /> },
      { path: "/salle-list", exact: true, element:<SalleList /> }, // Ajouter la route ici
      { path: "/salle-up/:id_salle", exact: true, element:<SalleUpdate/> }, // Ajouter la route ici
      { path: "/salle-del/:id_salle", exact: true, element:< DeleteSalle/> }, // Ajouter la route ici

      { path: "/addSalle_examen", element: <AddSalle_examen /> },
      { path: "/Salle_examen-list", exact: true, element:<Salle_examenList /> }, // Ajouter la route ici
      { path: "/Salle_examen-del/:id_salle", exact: true, element:< DeleteSalle_examen/> }, // Ajouter la route ici
      { path: "/Salle_examen-edit/:id_salle/:id_examen", exact: true, element: <UpdateSalle_examen /> },

      { path: "/addModule_niveau", element: <AddModule_niveau /> },
      { path: "/Module_niveau-list", exact: true, element:<Module_niveauList /> }, // Ajouter la route ici
      { path: "/Module_niveau-del/:id_module", exact: true, element:< DeleteModule_niveau/> }, // Ajouter la route ici

      { path: "/boxComponent", exact: true, element:<BoxComponent /> }, // Ajouter la route ici
      { path: "/boxComponentUp", exact: true, element:<BoxComponentUp /> }, // Ajouter la route ici
      { path: "/boxComponentBl", exact: true, element:<BoxComponentBl /> }, // Ajouter la route ici
      { path: "/boxComponentCl", exact: true, element:<BoxComponentCl /> }, // Ajouter la route ici
      { path: "*", element: <NotFound /> },

      { path: "/SurveillanceList", exact: true, element:<SurveillanceList /> }, // Ajouter la route ici
      { path: "/addSurveillance", element: <AddSurveillance /> },
      { path: "/update-surveillance/:id_surveillance", exact: true, element: <UpdateSurveillance /> },
      { path: "/delete-surveillance/:id_surveillance", exact: true, element: <DeleteSurveillance /> },


      {
        path: "/test-loading", element: <LoadingScreenTest />, },

      // Uncomment these routes if needed
      // { path: "/about", element: <About /> },
      // { path: "/alerts", element: <Alerts /> },
      // { path: "/badges", element: <Badges /> },
      // { path: "/buttons", element: <Buttons /> },
      // { path: "/cards", element: <Cards /> },
      // { path: "/grid", element: <Grid /> },
      // { path: "/table", element: <Tables /> },
       //{ path: "/forms", element: <Forms /> },
      // { path: "/breadcrumbs", element: <Breadcrumbs /> },
    ],
  },
];

export default ThemeRoutes;
