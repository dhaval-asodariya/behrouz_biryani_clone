
import './App.css';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import DeliveryBar from './components/Navbar/DeliveryBar';
import Navbar from './components/Navbar/Navbar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Hero from './components/Hero/Hero';
import { useEffect, useState } from 'react';
import Exclusive from './components/Exclusive/Exclusive';
import AllCategory from './components/AllCategories/AllCategory';
import SahiBiryanies from './components/SahiBiryanies/SahiBiryanies';
import DastaanEKebab from './components/DastaanEKebab/DastaanEKebab';
import RoyalCurry from './components/RoyalFood/RoyalCurry';
import Desserts from './components/Desserts/Desserts';
import NewLaunched from './components/NewLaunched/NewLaunched';
import Footer from './components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import CartTable from './components/CartTable/CartTable'
import {setWindowWidth} from './Redux/WidthSlice'
import SmallNavBar from './components/Navbar/SmallNavBar';
import MobileBottomNev from './components/Navbar/MobileBottomNev';
import { Sidebar } from 'react-feather';
import SideBar_Sample from './components/Navbar/SideBar_Sample';
import { Box } from '@mui/material';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartBarBottom from './components/CartBarBottom/CartBarBottom';
import SearchDialogDrawer from './components/SearchDrawer/SearchDialogDrawer'
import AllProductsNavigate from './components/AllProductsNavigate/AllProductsNavigate';
import NavTabs from './components/AllProductsNavigate/NavTabs'
import CartDetails from './components/CartTable/CartDetails';
import { setisCollectionOfData } from './Redux/DataTypeSlice';
import LoginRegiDrawer from './components/LoginRegister/loginRegisterDrawer'
import Dashboard from './components/Dashboard/UserDashboard';

function App() {
  // useEffect(()=>{
  //   restorentData();
  // },[])
  // async function restorentData(){
  //   const responce = await fetch('https://www.behrouzbiryani.com/v1/api/get_format?&store_id=10315&city_id=7642&isServer=false&page=1');
  //   const Data = await responce.json();
  //   console.log(Data);
  // }
  const [openSearch, setOpenSearch] = useState(false);
  const[isCart, setIsCart] = useState(false)
  const dispatch = useDispatch();
  const location = useLocation();
  const windowWidth= useSelector((state)=>state.windowWidth.width)


  const handleSearchOpen = () => {
    setOpenSearch(true);
  };
  const handleSearchClose = () => {
    setOpenSearch(false);
  };
  useEffect(() => {
    const handleResize = () => {
      dispatch(setWindowWidth(window.innerWidth));
    };
   

    window.addEventListener('resize', handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

useEffect(()=>{
  if(location.pathname == '/cartTable'){
    setIsCart(true)

  }else{setIsCart(false)}
})
  

  function HomePage(){
    useEffect(()=>{
      dispatch(setisCollectionOfData(false))
    })
    return(
      <Box>
<Hero/>


     <Exclusive/>
     <AllCategory/>
     <SahiBiryanies/>
     <DastaanEKebab/>
     <RoyalCurry/>
     <Desserts/>
     <NewLaunched/>
     <CartBarBottom/>

      </Box>
    )
  }

  return (
   
    // <BrowserRouter>
    <div className="App">
      {windowWidth>800?<Navbar  handleSearchOpen={handleSearchOpen}/>:<SmallNavBar/>}
      <SearchDialogDrawer openSearch={openSearch} handleSearchClose={handleSearchClose} />
     
     {/* <MobileBottomNev/> */}
     <DeliveryBar isCart={isCart}/>
     <Routes>
     <Route path='/' element={<HomePage/>}></Route>
     <Route path='cartTable' element={<CartDetails/>}></Route>
     <Route path='/allCategories' element={<NavTabs/>}>
        <Route index element={<AllProductsNavigate/>}></Route>
        <Route path='shahi-biryanis' element={<AllProductsNavigate/>}></Route>
        <Route path='exclusively-on-behrouz-app' element={<AllProductsNavigate/>}></Route>
        <Route path='dastaan-e-kebab' element={<AllProductsNavigate/>}></Route>
        <Route path='royal-curries-breads' element={<AllProductsNavigate/>}></Route>
        <Route path='desserts-and-beverages-by-behrouz' element={<AllProductsNavigate/>}></Route>
        <Route path='newly-launched' element={<AllProductsNavigate/>}></Route>
        <Route path='combos' element={<AllProductsNavigate/>}></Route>


     </Route>
     <Route path="/product/:productId" element={<ProductDetails/>}></Route>
     <Route path='login' element={<LoginRegiDrawer />}></Route>
     <Route path='signup' element={<LoginRegiDrawer/>}></Route>
     <Route path='/dashboard/:id' element={<Dashboard/>}></Route>
     {/* <Route path='cartTable' element={<CartTable/>}></Route> */}

     </Routes>
     
     <Footer/>
    

     
    </div>
    // </BrowserRouter>
   
  );
}

export default App;
