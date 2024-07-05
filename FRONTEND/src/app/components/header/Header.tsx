"use client";
import Image from 'next/image';
import {useContext, useState} from 'react';
import image from "./../../assets/logow.png";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import {AuthContext, AuthContextType} from '@/app/contexts/AuthContext';
import toast from 'react-hot-toast';
import {Logout} from '@/app/services/AuthService';
import {useRouter} from 'next/navigation';

function Header(props: any) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const context = useContext(AuthContext) as AuthContextType;
  const router = useRouter()

  const handleLogout = async () => {
    const toastId = toast.loading('Logging out...');
    const result = await Logout(context.user.email);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.dismiss(toastId);
    context.logout();
    router.replace("/pages/login", {scroll: false});
  };

  return (
    <div className='position-sticky sticky-top'>
      <Navbar color="darker" light expand="md" dark className='px-5 w-100'>
        <div className='d-flex justify-content-around w-100'>
        <div className='col-2'></div>
          <NavbarBrand href="/">
            <Image alt="" src={image} width={40} height={40} className='me-2'></Image>
            Codegather
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='ms-auto' navbar>

              {context.user.id !== "" ? (

                <div className='d-flex'>

                  {context.roles !== undefined && context.roles.includes("Admin") || context.roles.includes("Manager") ? (
                    <NavLink href="/pages/admin/dashboard">
                      Admin Dashboard
                    </NavLink>
                  ) : null}

                  <NavItem>
                    <NavLink href="/pages/competitions">Competitions</NavLink>
                  </NavItem>
                  <NavItem>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      {context.user.userName}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem href={`/pages/profile/${context.user.userName}`}>Profile</DropdownItem>
                      <DropdownItem href={"/pages/myCompetitions"}>My Competitions</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>

                </div>
              ) : (
                <NavItem>
                  <NavLink href="/pages/login">Login</NavLink>
                </NavItem>
              )}
            </Nav>
          </Collapse>
          <div className='col-1'></div>

        </div>
      </Navbar>
    </div>
  );
}

export default Header;
