import { lazy,Suspense } from "react"
import { Routes,Route } from "react-router-dom"
import Homepage from "./doctors/homepage.jsx"
import SpeechText from "./doctors/speechtext.jsx"
import LoadingPage from "./loadingpage.jsx"



function App() {
 const LGP=lazy(()=> import('./lifeai/loginpage.jsx'))
 const Tmt=lazy(()=> import('./doctors/treatmentplan.jsx'))
 const Sp=lazy(()=> import('./doctors/speechtext.jsx'))
 const GP=lazy(()=> import('./doctors/generateprescription.jsx'))
 const ADM=lazy(()=> import('./admin/adminlogin.jsx'))
 const ADMD=lazy(()=> import('./admin/adminhome.jsx'))
 const ITAM=lazy(()=> import('./admin/itadminregister.jsx'))
 const HADM=lazy(()=> import('./admin/gethospitaladmin.jsx'))
 const HAMLogin=lazy(()=> import('./admin/hospitaladminlogin.jsx'))
 const HD=lazy(()=> import('./admin/hospitaldashboard.jsx'))
 const ADoc=lazy(()=> import('./admin/adddoctor.jsx'))
 const DView=lazy(()=> import('./admin/view-doctor.jsx'))

  return (
    <>
      <Suspense fallback={<LoadingPage/>}>
      <Routes>
        <Route path="/hospital-dashboard" element={<HD/>}>
         <Route path="add-doctor" element={<ADoc/>}/>
         <Route path="view-doctor" element={<DView/>}/>
        </Route>
        <Route path="/admin" element={<ADM/>}/>
        <Route path="/hospital-login" element={<HAMLogin/>}/>
        <Route path="/admindashboard" element={<ADMD/>}>
        <Route path="add-it-admin" element={<ITAM/>}/>
        <Route path="hospital-admin" element={<HADM/>}/>
        
        </Route>
        <Route path="/" element={<LGP/>}/>
        <Route path="/doctor" element={<Homepage/>}>
        <Route path="/doctor" element={ <Sp/>}/>
        <Route path="prescription" element={<GP/>}/>

        
             <Route path="treamtentplan" element={
              <Tmt/>
             }/>
        </Route>
        
      </Routes>
      </Suspense>
    </>
  )
}

export default App
