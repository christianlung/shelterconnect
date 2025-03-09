'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
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

interface DonorListProps {
  donors: Donor[];
}

export default function DonorList({ donors }: DonorListProps) {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const donorsPerPage = 15;

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
    const numVisiblePages = 4;
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

    return pages;
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of our amazing donors!</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Donor</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentDonors.length > 0 ? (
            currentDonors.map((donor) => (
              <TableRow key={donor.id}>
                <TableCell className="font-medium">{donor.donorName}</TableCell>
                <TableCell className="text-right">
                  ${donor.finalDonorAmount}
                </TableCell>
                <TableCell className="text-right">
                  {new Date(donor.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No donors found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex">
          <Pagination className="mt-4">
            <PaginationContent className="flex-wrap justify-center">
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
