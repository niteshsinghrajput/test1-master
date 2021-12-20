import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./pages/homePage/HomePage";
import NewAdjustments from "./pages/newAdjustments/NewAdjustments";
import AdjusterPage from "./pages/adjusterPage/adjusterPage";
import AdjustmentsPage from "./pages/adjustmentsPage/AdjustmentsPage";
import { ApproverPage } from "./pages/approverPage/ApproverPage";
import RequestAudit from "./pages/requestAudit/RequestAudit";
import AuditList from "./pages/auditList/AuditList";
import AdjusterRequestAudit from "./pages/requestAudit/AdjusterRequestAudit";

export default function App(props) {
  const [users, setUsers] = useState([])
  const [loginUser, setLoginUser] = useState(null)

  useEffect(() => {
    const listUsers = [
      {
        name: "Dev usename",
        role: "Adjuster",
        label: "Adjuster Management Global"
      },
      {
        name: "Dev usename",
        role: "Approver",
        label: "Approver Management Global"
      }
    ]

    setUsers(listUsers);
    setLoginUser();
  }, [])

  const changeUser = (role) => {
    console.log(props.location)
    setLoginUser("")
    users.map(user => {
      if (user.role === role) {
        setLoginUser(user);
      }
    })

  }
  return (
    <Router>

      <div>
        <Route>
          <Header loginUser={loginUser} changeUser={changeUser} />
        </Route>
        {loginUser &&
          <div>

            <Switch>
              <Route path="/about">
                <HomePage loginUser={loginUser} />
              </Route>

              <Route path="/adjustment">
                <AdjustmentsPage />
              </Route>
              <Route path="/new-adjustments">
                <NewAdjustments loginUser={loginUser} />
              </Route>
              <Route path="/approver">
                <RequestAudit />
              </Route>

              <Route path="/audit-list">
                <AuditList />
              </Route>

              <Route path="/request-audit">
                <ApproverPage  />
              </Route>
              <Route path="/adjuster-request-audit">
                <AdjusterRequestAudit />
              </Route>

              <Route path="/">
                <HomePage loginUser={loginUser} />
              </Route>
            </Switch>
          </div>
        }

        {!loginUser &&
          <div className="container ">
            <div className="row">
              <div className="col-sm-12">
                <div className="alert alert-info alert-dismissible fade in">

                  <strong>Welcome!</strong> Please login.
                </div>
              </div>
            </div>
          </div>

        }
      </div>

    </Router>
  );
}


