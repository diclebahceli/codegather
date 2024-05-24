"use client";
import Card from "@/app/components/card/Card";
import {AuthContext, AuthContextType} from "@/app/contexts/AuthContext";
import Link from "next/link";
import {useContext} from "react";

const AdminHomePage = () => {
  const context = useContext(AuthContext) as AuthContextType;

  return (
    <div className="d-flex flex-column bg-dark h-100 align-items-center justify-content-evenly ">
      <h1 className="text-white fs-m">Admin Dashboard</h1>
      <div className="d-flex flex-row justify-content-around w-100 ">
        <div className="col-4">
          <Card>
            <div className="bg-grey p-5 d-flex align-items-center justify-content-center text-center fs-3 bg-dark rounded rounded-3 w-100 h-100">
              <Link
                className="text-decoration-none text-white stretched-link"
                href="/pages/admin/competition"
              >
                Manage Competitions
              </Link>
            </div>
          </Card>
        </div>

        {context.roles.includes("Admin") && (
          <div className="col-4">
            <Card>
              <div className="bg-grey p-5 d-flex align-items-center justify-content-center text-center fs-3 bg-dark rounded rounded-3 w-100 h-100">
                <Link
                  className="text-decoration-none text-white stretched-link"
                  href="/pages/admin/user"
                >
                  Manage Users
                </Link>
              </div>
            </Card>
          </div>


        )}
      </div>
    </div>
  );
};

export default AdminHomePage;
