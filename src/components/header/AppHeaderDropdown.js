import React from "react";
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownHeader,
  CDropdownItem,
  CDropdownDivider,
  CAvatar,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked } from "@coreui/icons";
import avatar8 from "./../../assets/images/avatars/8.jpg";

const AppHeaderDropdown = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">
          Account
        </CDropdownHeader>

        {currentUser && (
          <>
            <CDropdownHeader className="text-truncate mb-1">
              Username: {currentUser.username}
            </CDropdownHeader>
            <CDropdownHeader className="text-truncate mb-2">
              Email: {currentUser.email}
            </CDropdownHeader>
          </>
        )}


        <CDropdownDivider />
        <CDropdownItem href="/logout">
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
