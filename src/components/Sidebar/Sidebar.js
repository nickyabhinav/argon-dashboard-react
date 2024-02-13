import { useState, useEffect } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import axios from 'axios';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

var ps;

const aepsURL = process.env.AEPS_REDIRECT_URL;
const tokengen = process.env.aepsGenerateTokenUrl;

const Sidebar = (props) => {
  
  const [collapseOpen, setCollapseOpen] = useState();
  // verifies if routeName is the one active (in browser input) const [storedData, setStoredData] = useState(null);
  const [storedData, setStoredData] = useState([]);
  const [agentData, setAgentData] = useState([]);

  const AepsTokenGen = async () => {
    
   try {
 
     console.log('AepsTokenGen function called');
       const response = await axios.post(tokengen,{
       AgentID: agentData.agentId,
       agentAuthId: 'Test252132',
       agentAuthPassword: 'z7u61bx7el',
       apiId: '10029',
       retailerId: agentData.fulAgentId,
       pipe: '',
   });
     const json = await response.data;
     if (json.errorCode === '00' && json.errorMsg === 'Success') {
       const apiData = JSON.stringify(json);
       localStorage.setItem('apiData', apiData);
       const redirectUrl = `http://localhost:8080/AEPS/login?token=${json.data.token}`;
       window.open(redirectUrl, '_blank');
     }
   } catch (error) {
     console.error('Error:', error);
   }
  };


  const cmsAirtel = async () => {
    
    try {
   
  
      console.log('AepsTokenGen function called');
        const response = await axios.post(tokengen,{
        AgentID: agentData.agentId,
        agentAuthId: 'Test252132',
        agentAuthPassword: 'z7u61bx7el',
        apiId: '10029',
        retailerId: agentData.fulAgentId,
        pipe: '',
    });
      const json = await response.data;
      if (json.errorCode === '00' && json.errorMsg === 'Success') {
        const apiData = JSON.stringify(json);
        localStorage.setItem('apiData', apiData);
        const redirectUrl = `http://localhost:8080/AEPS/login?token=${json.data.token}`;
        window.open(redirectUrl, '_blank');
      }
    } catch (error) {
      console.error('Error:', error);
    }
   };
  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem('apiData');
  
    if (dataFromLocalStorage) {
      const parsedData = JSON.parse(dataFromLocalStorage);
      const parentList = parsedData.parentList;
      setStoredData(parentList);
      setAgentData(parsedData);
      

    }
    
  }, []); 

  


  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes, storedData) => {
    return routes.map((prop, key) => {
      if (storedData && storedData.some((v) => v.dispName === prop.name)) {
        return (
          <NavItem style={{}} key={key}>
            {prop.name === 'AEPS' ? (
             <button onClick={() => AepsTokenGen()} style={{ border: 'none', background: 'none' }}>
             <p style={{ paddingLeft: '30px', fontWeight: 'bold' }}>{prop.name}</p>
           </button>
            ) : (
              <div>
                <NavLink
                  to={prop.layout + prop.path}
                  tag={NavLinkRRD}
                  onClick={closeCollapse}
                >
                  {/* <img style={{width:"32px", height:"32px", borderRadius:"50%" , 
                    backgroundColor:"#31304D", marginBottom:"12px"}}src={prop.icon} /> */}
                  <p style={{ paddingLeft: '10px', fontWeight: 'bold' }}>{prop.name}</p>
                </NavLink>
              </div>
            )}
          </NavItem>
        );
      } else {
        return null;
      }
    });
  };
  

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }


  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right
            >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={require("../../assets/img/theme/team-1-800x800.jpg")}
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          
          {/* Navigation */}
          <Nav navbar>{createLinks(routes, storedData)}</Nav>

         
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
