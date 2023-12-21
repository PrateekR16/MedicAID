import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { eycontext } from '../context/MainContext'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPages'
import DashboardPage from '../pages/DashboardPage'
import AllPatientsPage from '../pages/Doctor/AllPatientsPage'
import AppointmentsPage from '../pages/Doctor/AppointmentsPage'
import ReportsPage from '../pages/Patient/ReportsPage'
import UserGetStartedPage from '../pages/UserGetStartedPage'
import CreateErupi from '../pages/CreateErupi'
import ViewVouchers from '../pages/ViewVouchers'
import CategoryCoupons from '../pages/CategoryCoupons'
import SchemesPage from '../pages/SchemesPage'
import SchemeDetsPage from '../pages/SchemeDetsPage'
import UtilityVoucherPage from '../pages/UtilityVoucherPage'
import MerchantList from '../pages/MerchantList'
import TransactionPage from '../pages/TransactionPage'
import SinglePatientPage from '../pages/Doctor/SinglePatientPage'

export default function MainRouter() {
  const { user, setUser, setOpen } = useContext(eycontext)
  function PrivateRouter() {
    return user !== null ? (
      <>
        <Outlet />
      </>
    ) : (
      <>
        {JSON.parse(localStorage.getItem('eyUser')) === null && (
          <Navigate to="/login" />
        )}
      </>
    )
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('eyUser')))
  }, [])

  return (
    <>
      <Routes>
        <Route exact path="/signup/beneficiary" element={<SignupPage />} />
        <Route exact path="/login" element={<LoginPage />} />

        <Route path="/" element={<PrivateRouter />}>
          <Route exact path="/" element={<DashboardPage />} />
        </Route>

        {/* Doctor */}
        <Route path="/allpatients" element={<PrivateRouter />}>
          <Route exact path="/allpatients" element={<AllPatientsPage />} />
        </Route>

        <Route path="/appointments" element={<PrivateRouter />}>
          <Route exact path="/appointments" element={<AppointmentsPage />} />
        </Route>

        <Route path="/patient_details" element={<PrivateRouter />}>
          <Route exact path="/patient_details" element={<SinglePatientPage />} />
        </Route>

        {/* Patients */}
        <Route path="/reports" element={<PrivateRouter />}>
          <Route exact path="/reports" element={<ReportsPage />} />
        </Route>



        <Route path="/scheme" element={<PrivateRouter />}>
          <Route exact path="/scheme" element={<SchemesPage />} />
        </Route>
        <Route path="/scheme/:id" element={<PrivateRouter />}>
          <Route exact path="/scheme/:id" element={<SchemeDetsPage />} />
        </Route>
        <Route path="/vouchers/utility" element={<PrivateRouter />}>
          <Route
            exact
            path="/vouchers/utility"
            element={<UtilityVoucherPage />}
          />
        </Route>
        <Route path="/bank/createerupi" element={<PrivateRouter />}>
          <Route exact path="/bank/createerupi" element={<CreateErupi />} />
        </Route>
        <Route path="/viewvouchers" element={<PrivateRouter />}>
          <Route exact path="/viewvouchers" element={<ViewVouchers />} />
        </Route>
        <Route path="/user/getstarted" element={<PrivateRouter />}>
          <Route
            exact
            path="/user/getstarted"
            element={<UserGetStartedPage />}
          />
        </Route>
        <Route path="/user/getstarted/:category" element={<PrivateRouter />}>
          <Route
            exact
            path="/user/getstarted/:category"
            element={<CategoryCoupons />}
          />
        </Route>
        <Route path="/merchant/list" element={<PrivateRouter />}>
          <Route exact path="/merchant/list" element={<MerchantList />} />
        </Route>
        <Route path="/transactions" element={<PrivateRouter />}>
          <Route exact path="/transactions" element={<TransactionPage />} />
        </Route>

        {/* not needed for now */}
        <Route exact path="/signup/merchant" element={<SignupPage />} />
        <Route exact path="/signup/bank" element={<SignupPage />} />
        <Route exact path="/signup/organisation" element={<SignupPage />} />
        {/* not needed for now */}
      </Routes>
    </>
  )
}
