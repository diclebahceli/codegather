"use client";

import {useEffect, useState} from "react";
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";

export default function Paginator({pageSize, data, handlePageChange}:
  {pageSize: number, data: any[], handlePageChange: (data: any[]) => void}) {

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = pageSize;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    if (data.length === 0) return;
    handlePageChange(currentUsers);

  }, [currentPage, data])

  return (
    <Pagination aria-label="Page navigation" size="lg" className="align-self-center my-5">
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink
          first
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(1);
          }}
        />
      </PaginationItem>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink
          previous
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(currentPage - 1);
          }}
        />
      </PaginationItem>
      <PaginationItem disabled={currentPage === Math.ceil(data.length / usersPerPage)}>
        <PaginationLink
          next
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(currentPage + 1);
          }}
        />
      </PaginationItem>
      <PaginationItem disabled={currentPage === Math.ceil(data.length / usersPerPage)}>
        <PaginationLink
          last
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(Math.ceil(data.length / usersPerPage));
          }}
        />
      </PaginationItem>
    </Pagination>

  )

}
