import React, { useEffect } from "react";
import BookmarkBorderOutlined from "@mui/icons-material/BookmarkBorderOutlined";
import GridOnOutlined from "@mui/icons-material/GridOnOutlined";
import LiveTv from "@mui/icons-material/LiveTv";
import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import './NavTabs.css'
import Dataset from "../Dataset/Dataset";
import BorderAllIcon from '@mui/icons-material/BorderAll';
import { Link, Outlet, useLocation } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory,setActiveIndex } from "../../Redux/ActiveCategorySlice";

const TabItem = styled(Tab)(({ theme,isActive  }) => ({
//   lineHeight: "inherit",
  minWidth: 0,
  fontSize: 10,
  padding: "0px",
  height: '37px',
  minHeight:" 37px",
  width: "126px",
  textAlign:'left',
  justifyContent: "flex-start",
  borderRadius: "4px",
  background:  "#fff" ,
  opacity: isActive ? '1' : '0.8',
  flexDirection: "row",
  letterSpacing: "1px",
  textTransform: "uppercase",
  "& svg, .material-icons": {
    fontSize: 16,
    marginRight: 8,
  },
  "&:not(:last-child)": {
    marginRight: 24,
    [theme.breakpoints.up("sm")]: {
      marginRight: 10,
    },
  },
  [theme.breakpoints.up("md")]: {
    minWidth: 0,

  },
  [`& .${tabClasses.labelIcon}`]: {
    minHeight: 53,
    padding:'10px 0',

  },
  [`& .${tabClasses.iconWrapper}`]: {
    marginBottom: 0,
  },
}));

export default function TabsInstagram() {
  const ActiveIndex = useSelector((state)=>state.ActiveCategory.ActiveIndex)
  const [tabIndex, setTabIndex] = React.useState(ActiveIndex);
  const location = useLocation();
  const dispatch = useDispatch();
  const ActiveCategory = useSelector((state)=>state.ActiveCategory.ActiveCategory)
  useEffect(()=>{
// console.log('activeindex100',ActiveIndex)

    const currentpath = location.pathname.split('/').at(-1)
    dispatch(setActiveCategory(currentpath))
    const localactiveIndex = allCategoryName.filter((oneCategory)=>oneCategory.path == currentpath)[0]
    setTabIndex(localactiveIndex?.index || 0 );
// console.log('activeindex111',ActiveIndex)

  },[])
//   useEffect(()=>{
// console.log('activeindex100',ActiveIndex)
//     const localactiveIndex = allCategoryName.filter((oneCategory)=>oneCategory.path == currentpath)
//     setTabIndex(ActiveIndex )
//   },[])

console.log('activeindex111222',ActiveIndex)

  const allCategoryName =[{name:"All Categories",index:0,img:'https://rp-media.faasos.io/catalog/images/SIXR5BALPRZO.jpeg?d=375&tr:w-0.5,h-0.5',path:'/allCategories'},
  {name:"Exclusively on Behrouz App",index:1,img:'https://product-assets.faasos.io/eatsure_cms/production/88a87518-d7d1-4fff-a147-2153220ba90f.jpg?d=375&tr:w-0.5,h-0.5',path:'exclusively-on-behrouz-app'},
  {name:"Shahi Biryanis",index:2,img:'https://product-assets.faasos.io/eatsure_cms/production/69f3d0cc-0fcd-4b97-84ef-96358ab2012f.avif?d=375&tr:w-0.5,h-0.5',path:'shahi-biryanis'},
  {name:"Dastaan-E-Kebab",index:3,img:'https://product-assets.faasos.io/eatsure_cms/production/799ae39b-a0cc-4482-9b35-a8ebf5ac6751.avif?d=375&tr:w-0.5,h-0.5',path:'dastaan-e-kebab'},
  {name:"Royal Curries & Breads",index:4,img:'https://product-assets.faasos.io/eatsure_cms/production/6a8c52b4-b2b9-4849-aa22-5b51e8fea481.avif?d=375&tr:w-0.5,h-0.5',path:'royal-curries-breads'},
  {name:"Desserts & Beverages by Behrouz",index:5,img:'https://product-assets.faasos.io/eatsure_cms/production/12c2d0b2-e39a-41c0-9997-cee8bb47226b.JPG?d=375&tr:w-0.5,h-0.5',path:'desserts-and-beverages-by-behrouz'},
  {name:"Newly Launched",index:6,img:'https://product-assets.faasos.io/eatsure_cms/production/15c2f34b-69f0-46b8-9973-cd2c980a1e4e.avif?d=375&tr:w-0.5,h-0.5',path:'newly-launched'},
  {name:"Combos",index:7,img:'https://rp-media.faasos.io/catalog/images/WQISBHSJMPXY.jpeg?d=375&tr:w-0.5,h-0.5',path:'combos'},

]

function handleDispach(categName){
  // dispatch(setActiveCategory(path+'&'+index));
  dispatch(setActiveCategory(categName.path))
  dispatch(setActiveIndex(categName.index))
}
function NavTabClickHandeler(index,categName){
  setTabIndex(index);
  handleDispach(categName)
}
  return (
    <div className="NavTabs-section">

    <Container className="NavTabs-container">
    <Box className="allCat-navigation-btn">
    <Tabs
    
    textColor="inherit"
    value={tabIndex}
    // onChange={(e, index) => setTabIndex(index)}
    sx={{
      boxShadow: "inset 0 1px 0 0 #efefef",
      overflow: "visible",
      // opacity:'1',
      [`& .${tabsClasses.indicator}`]: {
        bottom: "unset",
        top: 0,
        height: "1px",
        backgroundColor: "#262626",
        
      },
    }}
  >
      {allCategoryName.map((categName,index)=>{
          const categnameSort = categName.name.length >20? categName.name.slice(0,20) +'...':categName.name;
          const isActive = ActiveCategory ===   categName.path;
          return(
              <Link key={categName.index} to={categName.path} onClick={()=>NavTabClickHandeler(index,categName)}>
<TabItem disableRipple label={categnameSort} isActive={isActive} icon={<img style={{width:'37px',height:'37px',marginRight:'8px'}} src={categName.img} alt="Data" />} />
</Link>
          )
          
      })}
    {/* <TabItem disableRipple label={"Data"} icon={<img style={{width:'37px',height:'37px',marginRight:'8px'}} src="https://product-assets.faasos.io/eatsure_cms/production/69f3d0cc-0fcd-4b97-84ef-96358ab2012f.avif?d=375&tr:w-0.5,h-0.5" alt="Data" />} /> */}
    {/* <TabItem disableRipple label={"Rule"} icon={<img style={{width:'37px',height:'37px',marginRight:'8px'}} src="https://product-assets.faasos.io/eatsure_cms/production/69f3d0cc-0fcd-4b97-84ef-96358ab2012f.avif?d=375&tr:w-0.5,h-0.5" alt="Data" />} />
    <TabItem
      disableRipple
      label={"Indexes"}
      icon={<img style={{width:'37px',height:'37px',marginRight:'8px'}} src="https://product-assets.faasos.io/eatsure_cms/production/69f3d0cc-0fcd-4b97-84ef-96358ab2012f.avif?d=375&tr:w-0.5,h-0.5" alt="Data" />}
    />
    <TabItem disableRipple label={"Usage"} icon={<img style={{width:'37px',height:'37px',marginRight:'8px'}} src="https://product-assets.faasos.io/eatsure_cms/production/69f3d0cc-0fcd-4b97-84ef-96358ab2012f.avif?d=375&tr:w-0.5,h-0.5" alt="Data" />}/> */}
  </Tabs>
    </Box>

    </Container>
    <Outlet />

    </div>
   
  );
}