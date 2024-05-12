import { Box, Container, List, ListItem, Typography } from '@mui/material'
import React from 'react'
import logo from '../../Assets/Images/bb-brandcolor-logo.svg'
import payments from '../../Assets/Images/securepay-3x.png'
import { ReactComponent as youtube } from "../../Assets/Images/icons/youtubeIcon.svg"
import { ReactComponent as insta } from "../../Assets/Images/icons/youtubeIcon.svg"
import { ReactComponent as twiter } from "../../Assets/Images/icons/youtubeIcon.svg"
import { ReactComponent as phone } from "../../Assets/Images/icons/youtubeIcon.svg"
import { ReactComponent as facebook } from "../../Assets/Images/icons/youtubeIcon.svg"
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import CallIcon from '@mui/icons-material/Call';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from '@mui/material/Link';


import SvgIcon from '@mui/material/SvgIcon';
import './Footer.css'

function Footer() {
  return (
    <div className='footer-section'>
        <Container className='footer-container'>
            <Box className='footer-contact'>
                <Box className='footer-contact-social'>
                    <Box className='footer-logo'><img  src={logo}></img></Box>
                    <Box className='social-icon-nd-text'>
                        <Typography variant='h6'>Find us candid on</Typography>
                        
                        <List className='social-icons'>
      <ListItem>
      <Link href="#"><YouTubeIcon ></YouTubeIcon></Link>
      </ListItem>
      <ListItem>
      <Link  href="#"><FacebookIcon ></FacebookIcon></Link>
      </ListItem>
      <ListItem>
      <Link  href="#"><InstagramIcon ></InstagramIcon></Link>
      </ListItem>
      <ListItem>
      <Link  href="#"><TwitterIcon ></TwitterIcon></Link>
      </ListItem>
    </List>
                         
                          
                           {/* <SvgIcon sx={{fontSize:'54px',marginRight:'10px'}} component={youtube} viewBox="0 0 10 10" /> */}
                        
                        
                       
                    </Box>
                </Box>
                <Box className='footer-contact-links'>
                    <Box className='footer-contact-links-box'>
                        <Typography variant='h6'>Topics</Typography>
                        <List className='footer-contact-links-box-ul'>
      <ListItem>
      <Link href="#">Order Biryani Online</Link>
      </ListItem>
      <ListItem>
      <Link  href="#">Chicken Biryani Online</Link>
      </ListItem>
      <ListItem>
      <Link  href="#">Veg Biryani Online</Link>
      </ListItem>
      
    </List>
                    </Box>
                    <Box className='footer-contact-links-box'>
                    <Typography variant='h6'>Legal</Typography>
                        <List className='footer-contact-links-box-ul'>
      <ListItem>
      <Link href="#">Terms & Conditions</Link>
      </ListItem>
      
      
    </List>
                    </Box>
                    <Box className='footer-contact-links-box'>
                    <Typography variant='h6'>Contact Us</Typography>
                        <List className='footer-contact-links-box-ul'>
      <ListItem>
      <Link href="#">Party Orders</Link>
      </ListItem>
      <ListItem>
      <Link  href="#">Mehfil By Behrouz</Link>
      </ListItem>
     
      
    </List>
                    </Box>

                </Box>
                <Box className='footer-contact-callNo'>
                    {/* <Box> */}
                      <CallIcon sx={{fontSize:'20px',marginRight:'10px',padding:'3px',border:'1px solid white',borderRadius:'50%'}}></CallIcon>
                      <Typography variant='h5'>We are here to help you.</Typography>
                      <Link href='tel:07700050050'> Call us at <strong>07700050050</strong></Link>
                      

                    {/* </Box> */}
                </Box>
            </Box>
            
        </Container>
        <Box className='footer-copyright'>
          <Box className='footer-copyright-container'>
            <Box className='securePayment'>
              <Typography>Secure Payment</Typography>
              <img src={payments}></img>
            </Box>
            <Box className='copyright-text'>
              <Typography>Copyright © 2024.Behrouz Biryani- by Dhaval Asodariya. Made With Love<FavoriteIcon sx={{fontSize:'13px',marginLeft:'6px'}}/></Typography>
            </Box>
          </Box>
         
        
        </Box>
    </div>
  )
}

export default Footer