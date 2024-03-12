import React from "react";
import Button from "../Button";

interface SidebarPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const SidebarPagination: React.FC<SidebarPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="primary"
        disabled={currentPage === 0}
        onClick={() => handlePageChange(0)}
        text="<<"
        size="small"
      />
      <Button
        variant="primary"
        disabled={currentPage === 0}
        onClick={() => handlePageChange(currentPage - 1)}
        text="<"
        size="small"
      />
      <span className="text-sm">Page {currentPage + 1}</span>
      <Button
        size="small"
        variant="primary"
        disabled={currentPage >= totalPages - 1}
        onClick={() => handlePageChange(currentPage + 1)}
        text=">"
      />
      <Button
        size="small"
        variant="primary"
        disabled={currentPage >= totalPages - 1}
        onClick={() => handlePageChange(totalPages - 1)}
        text=">>"
      />
    </div>
  );
};

export default SidebarPagination;
