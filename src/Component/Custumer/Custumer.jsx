import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { ChevronDownIcon } from "./ChevronIcon";

import { capitalize } from "./Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faChevronDown,
  faLock,
  faMagnifyingGlass,
  faPhone,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { custumer, roles } from "../Redux/selector";
import { Label } from "recharts";
import {
  ChangeRolesForAccount,
  ChangerolePermission,
  CheckRolesForAccount,
  CheckSignupEmail,
  CreateAcount,
  CreateRolesForAccount,
  CreateRolespermissionForAccount,
  GetCustumerbyid,
} from "../Redux/CustummerSlice";
import { toast } from "react-toastify";
const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "AGE", uid: "age", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "EMAIL", uid: "email" },
  { name: "Gender", uid: "gender", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];
const roles1 = ["Employee", "Customer", "Admin"];
const statusOptions = [
  { name: "Nam", uid: "Nam" },
  { name: "Nữ", uid: "Nữ" },
  { name: "Chưa Cập nhập", uid: "Chưa Cập nhập" },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

export default function App() {
  const Roles = useSelector(roles);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [flat, setflat] = useState(false);
  const [flat1, setflat1] = useState(false);
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [selected, setSelected] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
    direction: "ascending",
  });
  console.log(Array.from(selectedKeys));
  const [page, setPage] = useState(1);
  const Custumer = useSelector(custumer);
  // const arr=custumer.map((el)=>)

  function calculateAge(birthdate) {
    console.log(birthdate);
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
  const handleChangetrue = () => {
    setflat1(true);
    onOpen();
  };
  const handleChangefalse = () => {
    if (Array.from(selectedKeys).length !== 0) {
      if(selectedKeys=='all')
        {
          const arr=Custumer.map((el)=>el.account_id)
          setSelectedKeys(arr);
        }
      const isCustomer = Custumer.filter((el) => el.role == "Customer").some(
        (el) => Array.from(selectedKeys).some((el1) => el1 == el.account_id)
      );
      console.log(isCustomer);
      if (isCustomer) {
        toast.info(`Has account is Customer`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else {
        if (Array.from(selectedKeys).length == 1) {
          const arr = Custumer[Array.from(selectedKeys)[0]].rolePermission
            .map((el) => el.permission)
            .map(
              (el) =>
                Roles.find((el1) => el1.permission_name == el).permissions_id
            );
          setSelected(arr);
        }
        setflat1(false);
        onOpen();
      }
    } else {
      toast.info(`Choose Account to add roles`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleActionClick = async () => {
    if (flat1) {
      if (email === "") {
        toast.info(`Has value Empty`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else {
        if (!flat) {
          const check = await dispatch(CheckSignupEmail(email));
          if (check.payload) {
            toast.info(`Tài Khoản ${email} đã được đăng ký`, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
            setflat(false);
          } else {
            setflat(true);
          }
        } else {
          if (phoneNumber === "" || password === "" || username === "") {
            toast.info(`Has value Empty`, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          } else {
            await dispatch(
              CreateAcount({
                email: email,
                username: username,
                phoneNumber: phoneNumber,
                password: password,
                roleID: 2,
              })
            );
            onClose();
            setflat(false);
          }
        }
      }
    } else {
      if (Array.from(selectedKeys).length !== 0) {
        console.log();
        await dispatch(
          ChangerolePermission({
            Permission: selected,
            listidcustumer: Array.from(selectedKeys),
          })
        );
        toast.success(`Action change Roles Complete`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.info(`No account selected for role change`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const hanldlechangeRoles = async (account_id, e) => {
    console.log(account_id);
    const arr = Array.from(e)[0];
    if (arr == "Customer") {
      await dispatch(
        ChangeRolesForAccount({
          account_id: account_id,
          roles_id: 2,
        })
      );
      await dispatch(GetCustumerbyid(account_id));
       toast.success(`Success change Role to Customer`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
    } else if (arr == "Employee") {
      const id = await dispatch(
        CheckRolesForAccount({ name: `Employee${account_id}` })
      );
      if (id.payload != -1) {
        console.log(id.payload)
        await dispatch(
          
          ChangeRolesForAccount({
            account_id: account_id,
            roles_id: id.payload,
          })
        );
      } else {
        const newid = await dispatch(
          CreateRolesForAccount({role:`Employee${account_id}`} )
        );
        await dispatch(
          CreateRolespermissionForAccount({
            role: newid.payload,
            permission: 8,
          })
        );
        console.log(newid.payload)
        await dispatch(
        ChangeRolesForAccount({
          account_id: account_id,
          roles_id: newid.payload,
        })
      );
      }
      await dispatch(GetCustumerbyid(account_id));
       toast.success(`Success change Role to Employee`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
    } else {
      await dispatch(
        ChangeRolesForAccount({
          account_id: account_id,
          roles_id: 4,
        })
      );
      await dispatch(GetCustumerbyid(account_id));
       toast.success(`Success change Role to Admin`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
    }
    console.log(arr);
  };
  const users = Custumer.map((el) => ({
    id: el.account_id,
    name: el.username,
    phoneNumber: el.phoneNumber,
    gender: el.gender ? el.gender : "Chưa Cập nhập",
    age: el.dayOfBirth ? calculateAge(el.dayOfBirth) : "Chưa Cập Nhập",
    avatar: el.avatarString
      ? el.avatarString
      : "https://www.freeiconspng.com/thumbs/account-icon/account-icon-8.png",
    email: el.email,
    role: el.role,
  }));
  console.log(users);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];
    console.log(filteredUsers);
    console.log(filterValue);
    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name
          ? user.name.toLowerCase().includes(filterValue.toLowerCase())
          : false
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.gender)
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "xl", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <Dropdown backdrop="blur">
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<FontAwesomeIcon icon={faChevronDown} />}
                variant="flat"
              >
                {cellValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Table Columns"
              variant="flat"
              disallowEmptySelection
              closeOnSelect={true}
              selectedKeys={statusFilter}
              selectionMode="single"
              onSelectionChange={(keys) => hanldlechangeRoles(user.id, keys)}
            >
              {roles1.map((status) => (
                <DropdownItem key={status} className="capitalize">
                  {status}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        );
      case "gender":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{ color: "#d3e1f8" }}
              />
            }
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<FontAwesomeIcon icon={faChevronDown} />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown backdrop="blur">
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Button
              color="primary"
              onPress={handleChangetrue}
              endContent={
                <FontAwesomeIcon icon={faPlus} style={{ color: "#74C0FC" }} />
              }
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    users.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center ">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div className=" translate-x-10 w-[1350px] h-full justify-center flex flex-row gap-5 mt-10">
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        className="w-[1100px]"
        classNames={{
          table: "shadow-lg rounded-lg",
          headerColumns: "bg-slate-300",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns} className="bg-slate-400">
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="w-[15%]   flex flex-col">
        <Button
          className="w-50%"
          color="primary"
          onPress={handleChangefalse}
          endContent={
            <FontAwesomeIcon icon={faPlus} style={{ color: "#74C0FC" }} />
          }
        >
          Add Roles
        </Button>
      </div>

      <Modal
        size="xl"
        isOpen={isOpen}
        onOpenChange={onClose} // Use onClose to close the modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent className="bg-white border-[2px] rounded-xl border-slate-500">
          <ModalHeader className="flex flex-col gap-1">
            Add new Account
          </ModalHeader>
          <ModalBody>
            {flat1 ? (
              !flat ? (
                <div>
                  <Input
                    isClearable
                    label="Email"
                    classNames={{ label: "pb-10 font-mono" }}
                    className="w-full shadow-md rounded-md"
                    placeholder="Enter Email account..."
                    startContent={
                      <FontAwesomeIcon
                        icon={faAt}
                        style={{ color: "#fd4444" }}
                      />
                    }
                    value={email}
                    onClear={onClear}
                    onValueChange={setemail}
                  />
                </div>
              ) : (
                <div className="w-full flex flex-col gap-4">
                  <Input
                    isClearable
                    label="Search"
                    classNames={{ label: "pb-10 " }}
                    className="w-full shadow-md rounded-md"
                    placeholder="Enter Pass account..."
                    startContent={
                      <FontAwesomeIcon
                        icon={faLock}
                        style={{ color: "#74C0FC" }}
                      />
                    }
                    value={password}
                    onClear={onClear}
                    onValueChange={setpassword}
                  />
                  <Input
                    isClearable
                    className="w-full shadow-md rounded-md"
                    placeholder="Enter Username account..."
                    startContent={<FontAwesomeIcon icon={faUser} />}
                    value={username}
                    onClear={onClear}
                    onValueChange={setusername}
                  />
                  <Input
                    isClearable
                    className="w-full shadow-md rounded-md"
                    placeholder="Enter Phone account..."
                    startContent={<FontAwesomeIcon icon={faPhone} />}
                    value={phoneNumber}
                    onClear={onClear}
                    onValueChange={setphoneNumber}
                  />
                </div>
              )
            ) : (
              <div className=" gap-5 flex flex-row flex-wrap">
                {Roles.map((el) => (
                  <Button
                    onClick={() => {
                      const isSelected = selected.includes(el.permissions_id);
                      if (!isSelected) {
                        setSelected([...selected, el.permissions_id]);
                      } else {
                        setSelected(
                          selected.filter((id) => id !== el.permissions_id)
                        );
                      }
                    }}
                    className={`h-10 border-[2px]  w-[200px] m-auto ${
                      selected.includes(el.permissions_id)
                        ? "bg-[#b6bfec] text-[#5d73de] border-[#5d73de]"
                        : "border-slate-200"
                    }`}
                  >
                    {el.permission_name}
                  </Button>
                ))}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              className="border-[2px] border-red-400 text-red-500 bg-white"
              onPress={onClose}
            >
              Close
            </Button>
            {loading ? (
              <Button
                isLoading
                className="bg-blue-500 text-white font-bold"
                color="secondary"
                spinner={
                  <svg
                    className="animate-spin h-5 w-5 text-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      fill="currentColor"
                    />
                  </svg>
                }
              >
                Loading
              </Button>
            ) : (
              <Button
                color="primary"
                className="border-[2px] border-green-400 bg-green-200 text-green-500"
                onPress={handleActionClick}
              >
                Action
              </Button>
            )}
            {/* <ToastContainer /> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
