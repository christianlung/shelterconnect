'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { Donor } from '@prisma/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

interface DonorListProps {
  donors: Donor[];
}

export default function DonorList({ donors }: DonorListProps) {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const donorsPerPage = 10;

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <p>Loading donors...</p>;

  const totalPages = Math.ceil(donors.length / donorsPerPage);
  const indexOfLastDonor = currentPage * donorsPerPage;
  const indexOfFirstDonor = indexOfLastDonor - donorsPerPage;
  const currentDonors = donors.slice(indexOfFirstDonor, indexOfLastDonor);

  const getPaginationItems = () => {
    const pages = [];
    const numVisiblePages = 3;
    const halfRange = Math.floor(numVisiblePages / 2);

    pages.push(
      <PaginationItem key={1}>
        <PaginationLink
          isActive={currentPage === 1}
          onClick={() => setCurrentPage(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>,
    );

    let startPage = Math.max(2, currentPage - halfRange);
    const endPage = Math.min(totalPages - 1, startPage + numVisiblePages - 1);

    if (endPage >= totalPages - 1) {
      startPage = Math.max(2, totalPages - numVisiblePages);
    }

    if (startPage > 2) {
      pages.push(<PaginationEllipsis key="start-ellipsis" />);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (endPage < totalPages - 1) {
      pages.push(<PaginationEllipsis key="end-ellipsis" />);
    }

    if (totalPages > 1) {
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            isActive={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return pages;
  };

  return (
    <div className="w-full rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
            <FontAwesomeIcon
              icon={faUsers}
              className="h-5 w-5 text-primary-500"
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Recent Donors</h2>
        </div>
        <span className="text-sm text-gray-500">{donors.length} total</span>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-gray-50">Donor</TableHead>
              <TableHead className="bg-gray-50 text-right">Amount</TableHead>
              <TableHead className="bg-gray-50 text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentDonors.length > 0 ? (
              currentDonors.map((donor) => (
                <TableRow key={donor.id}>
                  <TableCell className="font-medium">
                    {donor.donorName}
                  </TableCell>
                  <TableCell className="text-right font-medium text-primary-500">
                    ${donor.finalDonorAmount}
                  </TableCell>
                  <TableCell className="text-right text-gray-500">
                    {new Date(donor.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-gray-500">
                  No donors yet. Be the first to donate!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex max-w-full justify-center">
          <Pagination>
            <PaginationContent className="gap-1">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className={
                    currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                  }
                />
              </PaginationItem>
              {getPaginationItems()}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className={
                    currentPage === totalPages
                      ? 'pointer-events-none opacity-50'
                      : ''
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
