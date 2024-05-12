import React, { useEffect, useState } from "react";
import "./AllProductsNavigate.css";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Divider, Grid, Link, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import NavTabs from './NavTabs'
import { Outlet } from "react-router";
import Dataset from "../Dataset/Dataset";
import ExclusiveCateData from '../Dataset/ExclusiveCateData'
import AllcategoryData from "../Dataset/AllCategoryData";
import toast from "react-hot-toast";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { setisCollectionOfData } from "../../Redux/DataTypeSlice";

function AllProductsNavigate({index}) {
  const[currentPath,setCurrentPath] = useState(document.location.pathname)
  const[currentPathData,setCurrentPathData] = useState(AllcategoryData[0].data)
  const[isCollectionOfData,setIsCollectionOfData] = useState(true)
  const[ActiveSideNav, setActiveSideNav] = useState(0);
  const dispatch = useDispatch();
  const windowWidth= useSelector((state)=>state.windowWidth.width)
  // const isCollectionOfDataRedux = useSelector((state)=>(state.DataType.isCollectionOfData))

 
  useEffect(()=>{
    setCurrentPath(document.location.pathname.split('/').at(-1));
    // console.log(currentPath)
    setCurrentPathData(SelectData(currentPath));
    if(currentPath == 'exclusively-on-behrouz-app' || currentPath =='allCategories' ){
      setIsCollectionOfData(true);
    dispatch(setisCollectionOfData(true));

    }else{
      setIsCollectionOfData(false)
    dispatch(setisCollectionOfData(false));

    }
    window.scrollTo(0, 0); // Scroll to top on component mount

  })
  useEffect(()=>{
    setActiveSideNav(0);
  },[currentPath])


  function SelectData (path){
    switch(path) {
     
      case 'exclusively-on-behrouz-app':
        return ExclusiveCateData[0].products_data ;
      case 'shahi-biryanis':
        return Dataset[3];
      case 'dastaan-e-kebab':
        return Dataset[4];
      case 'royal-curries-breads':
        return Dataset[5];
      case 'desserts-and-beverages-by-behrouz':
        return Dataset[6];
      case 'newly-launched':
        return Dataset[7];
      case 'combos':
        return Dataset[8];
      default:
        return AllcategoryData[0].data ;
    }
  }
  console.log('currentPathData',currentPathData)
  console.log(isCollectionOfData)
 
  const scrollToTarget = (id) => {
    const scrollTarget = document.getElementById(`${id}`);
    if (scrollTarget) {
      scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  function handleActiveSideNav(collec,index){
   
    toast.success(`scrolling to ${collec.collection_name.slice(0,30)}...`);
    setActiveSideNav(index)

    const timerId = setTimeout(() => {
      // Function to be executed after delay
    scrollToTarget(collec.collection_id)
      console.log("Function called after 5 seconds");
    }, 200);

    // Cleanup function to clear the timer if component unmounts or delay changes
    return () => clearTimeout(timerId);
  }

  return (
    <div className="AllProductsNavigate-section">
      <Container className="AllProductsNavigate-container">
        {/* <Box className="allCat-navigation-btn">
           <NavTabs/>
        </Box> */}
        <Box className="allCategory-sideNav-Dispaly-Content">
          <Box className="allCategory-content-title">
            <Typography variant="h4" sx={{borderBottom:'2px solid rgb(189, 162, 110)', width:"max-content"}}>{(currentPath.charAt(0).toUpperCase() + currentPath.slice(1)).replaceAll('-',' ')}</Typography>
          </Box>
          <Box className="allCategory-content-inner">
            <Box sx={{width:windowWidth<800?'0':"30%"}} className="allCategory-content-sideNav">
                <Box className="allCategory-content-sideNav-inner">
                <List sx={{padding:'0px',display:windowWidth<800?'none':"block"}}>
                {isCollectionOfData? (currentPathData.collections.map((collec,index)=>(
                 
                     <Box sx={{borderLeft:`${index==ActiveSideNav?"2px":'0px'} solid rgb(189, 162, 110);
                     `}} >
                           <ListItem disablePadding>
                             <ListItemButton onClick={() =>handleActiveSideNav(collec,index)}>
                               <ListItemText  primary={collec.collection_name} primaryTypographyProps={{ sx: { fontSize: '14px' } }} />
                             </ListItemButton>
                           </ListItem>
                         <Divider />
                     </Box>
                   
                ))) :(<Box >
                  <List>
                  <ListItem disablePadding>
                    <ListItemButton  disablePadding>
                      <ListItemText  primary={currentPathData.name} primaryTypographyProps={{ sx: { fontSize: '14px' } }} />
                    </ListItemButton>
                  </ListItem>
                  </List>
                <Divider />
            </Box>)  }
                </List>
                </Box>
            </Box>
            <Box sx={{width:windowWidth <800 ? '100%':'70%'}} className="allCategory-content-displayItems">
               
               {isCollectionOfData?(currentPathData.collections.map((collec,index)=>(
                  <Box key={index} id={collec.collection_id} className='allCategory-display-oneCategory-items'>
                   <Box className='singleCategory-title'>
                        <Typography  sx={{fontSize:'20px',fontWeight:'600',marginBottom:'10px'}}>{collec.collection_name}({currentPathData.collections?.length})</Typography>
                    </Box>
                    <Box className='singleCategory-content-cards'>
                        {/* <Box className='category-card'></Box> */}
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                      {collec.products?.map((item, index) => (
                       <Grid item xs={4} sm={4} md={4} key={index}>
                        
                          {/* <Box className='category-card'></Box> */}
                        <ProductCard product={item}/>
                     
                       </Grid>
                     ))}
                   </Grid>
                    </Box>
                  </Box>
                ))) :(
                  <Box className='allCategory-display-oneCategory-items'>
                   <Box className='singleCategory-title'>
                        <Typography sx={{fontSize:'20px',fontWeight:'600',marginBottom:'10px'}}>{currentPathData.name}({currentPathData.render_data?.length})</Typography>
                    </Box>
                    <Box className='singleCategory-content-cards'>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                      {currentPathData.render_data?.map((item, index) => (
                       <Grid item xs={4} sm={4} md={4} key={index}>
                        
                          {/* <Box className='category-card'></Box> */}
                        <ProductCard product={item}/>
                     
                       </Grid>
                     ))}
                   </Grid>
                     
                       
                    </Box>
                  </Box>
                )}
                    
                
            </Box>
          </Box>
        </Box>
      </Container>
      <Outlet/>
    </div>
  );
}

export default AllProductsNavigate;
