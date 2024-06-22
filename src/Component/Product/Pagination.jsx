import React from "react";
import { Pagination, PaginationItemType } from "@nextui-org/react";
import { ChevronIcon } from "./ChevronIcon";

export default function App({ number, setCurrentPage }) {
  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className={"bg-default-200/50 min-w-8 w-8 h-8"}
          onClick={onNext}
        >
          <ChevronIcon className="rotate-180" />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className={"bg-default-200/50 min-w-8 w-8 h-8"}
          onClick={onPrevious}
        >
          <ChevronIcon />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={className}>
          ...
        </button>
      );
    }

    // cursor is the default item
    return (
      <button
        key={key}
        ref={ref}
        className={`${
          isActive &&
          "text-white bg-gradient-to-br from-indigo-500 to-pink-500 font-bold"
        }`}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };
  return (
    <Pagination
      disableCursorAnimation
      showControls
      total={number}
      initialPage={1}
      className="gap-2"
      radius="full"
      renderItem={renderItem}
      variant="light"
      onChange={setCurrentPage}
    />
  );
}
