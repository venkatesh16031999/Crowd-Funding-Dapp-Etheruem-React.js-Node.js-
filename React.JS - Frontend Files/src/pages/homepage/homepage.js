import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Embed,
  Visibility,
} from 'semantic-ui-react'
import styles from './homepage.module.css'
import Homeimage from '../../80910.jpg';
import Crowdfunding from '../../crowdfunding.png';
import Crowdfunding2 from '../../crowdfunding2.png';
import Crowdfunding3 from '../../crowdfunding3.png';
import { Link } from 'react-router-dom';
import { Accordion,Card } from 'react-bootstrap';

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const HomepageHeading = ({ mobile }) => (
  <Container text clas>
    <Header 
      as='h1'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
   
   <div>
   <svg viewBox="0 0 1300 150">
  <symbol id="s-text">
    <text text-anchor="middle" x="50%" y="80%">CROWD FUNDING</text>
  </symbol>

  <g class="g-ants">
    <use xlinkHref="#s-text" className={styles.textcopy}></use>
    <use xlinkHref="#s-text" className={styles.textcopy}></use>
    <use xlinkHref="#s-text" className={styles.textcopy}></use>
    <use xlinkHref="#s-text" className={styles.textcopy}></use>
    <use xlinkHref="#s-text" className={styles.textcopy}></use>
    <use xlinkHref="#s-text" className={styles.textcopy}></use>
    <use xlinkHref="#s-text" className={styles.textcopy}></use>
    <use  class="text-copy"></use>
  </g>
</svg>
   </div>

   <Link to="/campaign">
   <button primary size='huge' className={styles.homebutton}>
      Go To Campaign &nbsp;
      <Icon name='right arrow' />
    </button>
   </Link>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}
      style={{backgroundImage:"url('https://us.123rf.com/450wm/lumitar/lumitar1802/lumitar180200029/95008638-seamless-watercolor-paper-texture-vintage-craft-background.jpg?ver=6')"}}
      >
        <Visibility className="home"
            style={{
            backgroundImage: "url("+ Homeimage +")",
            backgroundSize: 'cover',
            backgroundPosition:"center",
            clipPath: "polygon(50% 0%, 100% 0, 100% 35%, 100% 87%, 85% 95%, 50% 100%, 15% 95%, 0 87%, 0% 35%, 0 1%)"
            }}
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment 
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
                style={{}}
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container  >
                <Menu.Item as='a' active>
                  Home
                </Menu.Item>
                <Menu.Item as='a'>Work</Menu.Item>
                <Menu.Item as='a'>Company</Menu.Item>
                <Menu.Item as='a'>Careers</Menu.Item>
                <Menu.Item position='right'>
                <Link to="/login">
                  <Button as='a' inverted={!fixed}>
                    Log in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                  </Link>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading  />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
        
      >
        
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as='a' active>
            Home
          </Menu.Item>
          <Menu.Item as='a'>Work</Menu.Item>
          <Menu.Item as='a'>Company</Menu.Item>
          <Menu.Item as='a'>Careers</Menu.Item>
          <Menu.Item as='a'>Log in</Menu.Item>
          <Menu.Item as='a'>Sign Up</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          
        <Visibility className="home"
            style={{
              backgroundImage: "url("+ Homeimage +")",
              backgroundSize: 'cover',
              backgroundPosition:"center"
            }}
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          
          <Segment
            
            textAlign='center'
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <Container>
              
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                <Link to="/login">
                  <Button as='a' inverted>
                    Log in
                  </Button>
                  </Link>
                  <Link to="/register">
                  <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                  </Link>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>
          </Visibility>
          
          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer
  
  >
    <Segment style={{ padding: '8em 0em' }} vertical style={{backgroundImage:"url('https://us.123rf.com/450wm/lumitar/lumitar1802/lumitar180200029/95008638-seamless-watercolor-paper-texture-vintage-craft-background.jpg?ver=6')"}}>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              We Help Person who has an idea
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              We can give your Better security and trust worthy Campaigns so our Customers can provide fund and get benefited out of it.
              Let us delight your customers and empower your needs... through Blockchain driven platform.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              We Make Product That Can Rule The World
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Yes that's right, you thought it was the stuff of dreams, but even bananas can be
              bioengineered.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image  rounded size='large' src={Crowdfunding} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column floated='left' width={6}>
            <Image  rounded size='large' src={Crowdfunding2} />
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Good Customer Relationship
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              We provide easy negotiation with Campaign owner and interact with their idea and get benifetted
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
            How to Get Most benefitted out of this
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Find an Campaign And Verify the idea and Contribute the money to Campaign ,monce project is done get equal Share's 
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              We Help Person who has an idea
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              We can give your Better security and trust worthy Campaigns so our Customers can provide fund and get benefited out of it.
              Let us delight your customers and empower your needs... through Blockchain driven platform.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              We Make Product That Can Rule The World
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Yes that's right, you thought it was the stuff of dreams, but even bananas can be
              bioengineered.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image  rounded size='large' src={Crowdfunding3} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <br />
    <Segment style={{ padding: '4em 0em' }} vertical>

      
    </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container  text>
        <Header as='h3' style={{ fontSize: '2em' }}>
            Frequently Asked Questions ( FAQ's ) : 
        </Header>
        
          <Accordion defaultActiveKey="0">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  Click me!
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>Hello! I'm the body</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="2">
                  Click me!
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
      </Container>
    </Segment>

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Religious Ceremonies</List.Item>
                <List.Item as='a'>Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Banana Pre-Order</List.Item>
                <List.Item as='a'>DNA FAQ</List.Item>
                <List.Item as='a'>How To Access</List.Item>
                <List.Item as='a'>Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

export default HomepageLayout