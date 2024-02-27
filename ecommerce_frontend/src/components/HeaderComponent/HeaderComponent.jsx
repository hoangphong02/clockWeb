import {Badge, Col, Popover, message} from 'antd'
// import Search from 'antd/es/input/Search';
import { WrapperHeader, WrapperHeaderAccount, WrapperTextHeader,WrapperTextHeaderSmall,WrapperCartHeader, WrapperContentPopover, WrapperImgAvatar, WrapperTypeProduct, WrapperButtonDropdown, WrapperMenu, WrapperMenuItem } from './style';
import React, { useEffect, useState } from "react";
import {UserOutlined, CaretDownOutlined,ShoppingCartOutlined, AudioOutlined, AudioMutedOutlined, SearchOutlined} from '@ant-design/icons'
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import Loading from '../Loading/Loading';
import { searchProduct } from '../../redux/slides/productSlide';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import * as ProductService from "../../services/ProductService"
import { useQuery } from '@tanstack/react-query'
import { typeProductContant } from "../../contant";
import TypeProduct from '../TypeProduct/TypeProduct';
import logo from "../../assets/images/logo-decoration.png"

const HeaderComPonent = ({isHiddenSearch = false, isHiddenCart = false})=> {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [username, setUsername]= useState("")
  const [userAvatar, setUserAvatar]= useState("")
  const [search, setSearch]= useState('')
  const [loading, setLoading] = useState(false)
  const user = useSelector((state) => state.user)
  const order = useSelector((state)=> state.order)
  const [typeProduct, setTypeProduct] = useState([])
  const [isScrolled, setIsScrolled] = useState(false);
  const {id} = useParams()
  const [productOfType, setProductOfType]= useState([])
  const [addCartHeader, setAddCartHeader]= useState(false)
  const [listChecked, setListChecked]= useState([])
  const {state} = useLocation()
  console.log("idHeadTest",id)

   const path = window.location.pathname
   const segments = path.split('/');
  const adminPath = segments.pop();


  const fetchAllProduct = async ()=>{
      const res = await ProductService.getAllProduct("",100)
    return res.data
    }

    const queryProduct = useQuery({ queryKey: ['products'], queryFn: fetchAllProduct })

  const { isLoading: isLoadingProducts, data: products } = queryProduct

    const fetchAllProductType = async(type,page,limit)=>{
        setLoading(true);
         const res = await ProductService.getProductType(type,page, limit)
        if(res?.status === 'OK'){
            setLoading(false);
            setProductOfType(res?.data)
            console.log("res",res)
            // setPanigate({...panigate,total: res?.totalPage})
        }
        else{
            setLoading(false)
        }
    }

    useEffect(()=>{
fetchAllProductType(state, 0,100)
    },[state])

   
    console.log("setProductOfType",productOfType)
    console.log("productsHead",products)

  const fetchAllTypeProduct = async ()=>{
        const res = await ProductService.getAllTypeProduct()
        setTypeProduct(res.data)
    }
useEffect(()=>{
        fetchAllTypeProduct()
    },[])
  

  const handleNavigateLogin =()=>{
    navigate("/sign-in")
  }
  console.log("orderHead",order)
  const handleLogout = async()=>{
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    setLoading(false)
  }
  useEffect(()=>{
    setLoading(true)
    setUsername(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  },[user?.name,user?.avatar])
  const content = (
    <div>
      <WrapperContentPopover onClick={()=> navigate("/profile-user")}>Thông tin người dùng</WrapperContentPopover>
      {user?.isAdmin && (
        <WrapperContentPopover onClick={()=> navigate("/system/admin")}>Quản lý hệ thống</WrapperContentPopover>
        )}
        <WrapperContentPopover onClick={()=> navigate("/my-order",{ state : {
          id: user?.id,
          token : user?.access_token
        }
      })}>Đơn hàng của tôi</WrapperContentPopover>
        <WrapperContentPopover onClick={handleLogout}>Đăng xuất</WrapperContentPopover>
    </div>
  );


  const onSearch =(e)=>{
    setSearch(e.target.value)
     dispatch(searchProduct(e.target.value))
  }

    useEffect(() => {
    // Lắng nghe sự kiện scroll
    const handleScroll = () => {
      // Kiểm tra vị trí scroll và cập nhật trạng thái
      setIsScrolled(window.scrollY > 50);
    };

    // Đăng ký sự kiện scroll
    window.addEventListener('scroll', handleScroll);

    // Hủy đăng ký sự kiện khi component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // useEffect chỉ chạy một lần sau khi component được render


    //test mic

//   const getIdProduct = async (str) => { 
//   const text = str.toLowerCase();

//   if (productOfType && Array.isArray(productOfType)) {
//     const foundProduct = await productOfType.find((product) => product.name.toLowerCase() === text);

//     if (foundProduct) {
//       console.log('foundProduct:', foundProduct);
//       return foundProduct._id;
//     } else {
//       console.error('Product not found for text:', text);
//       return undefined;
//     }
//   } else {
//     console.error('productOfType is undefined or not an array', productOfType);
//     return undefined;
//   }
// }
 const getIdProduct = async (str) => { 
  const text = str.toLowerCase();
  if (products && Array.isArray(products)) {
    const foundProduct = await products.find((product) => product.name.toLowerCase()===text || product.name.toLowerCase().includes(text));

    if (foundProduct) {
      console.log('foundProduct:', foundProduct);
      return foundProduct._id;
    } else {
      console.error('Product not found for text:', text);
      return undefined;
    }
  } else {
    console.error('productOfType is undefined or not an array', productOfType);
    return undefined;
  }
}

const getChecked= ( num)=>{
      const id = order?.orderItems[num-1]?.product
      return id
}

   const {
    transcript,
    listening,resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();


    if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

      const handleDoc =(text)=>{
    var msg = new SpeechSynthesisUtterance();
    msg.lang = "vi-VI"; 
    msg.text = text;
    msg.volume = 1;
                  msg.rate = 0.6;
                  msg.pitch = 1;
    window.speechSynthesis.speak(msg); 
    console.log("msg",msg.text)
    }


  const helpNavigateByVoice = async (voidValue) =>{
    const text = voidValue.toLowerCase();
    let hasVatPham = false;
    let hasMuonMua = false
    let foundIdProduct = false; 
    let addCart = false
    let seeCart = false
    let suggest = false
    let contact = false
    let home = false

  if (text.includes("vật phẩm")) {
    hasVatPham = true;
  }
  if(text.includes("muốn mua") || text.includes("muốn xem")){
    hasMuonMua = true;
  }
  if(text.includes("thêm vào giỏ hàng")){
    addCart = true;
  }
  if(text.includes("xem giỏ hàng")){
    seeCart = true;
  }
  if(text.includes("gợi ý")){
    suggest = true;
  }
  if(text.includes("liên hệ")){
    contact = true;
  }
   if(text.includes("trang chủ")){
    home = true;
  }
if (hasVatPham) {
    if (text.includes("vật phẩm trang trí")) {
      const newType = text.split('trí')[1].trim();
      handleDoc(`vật phẩm trang trí ${newType}`)
      console.log("newType", newType);
      const setTimeNavi = setTimeout(()=>{navigate(`/product/${newType.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, { state: newType })
      resetTranscript()
    },1500)
      return ()=>clearTimeout(setTimeNavi);
      // navigate(`/product/${newType.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, { state: newType });
      resetTranscript();
    }
  }
  else{
    if(hasMuonMua){
       if(text.includes("muốn mua") || text.includes("muốn xem")){
          let newType = "";
        if (text.includes("muốn mua")) {
            newType = text.split('mua')[1]?.trim();
        } else if (text.includes("muốn xem")) {
            newType = text.split('xem')[1]?.trim();
        }
        console.log("newType",newType)
        let idProduct = await getIdProduct(newType)
        console.log("IdProHead",idProduct)
        if(idProduct){
          if (text.includes("muốn mua")) {
            handleDoc(`tôi muốn mua ${newType}`)
        } else if (text.includes("muốn xem")) {
            handleDoc(`tôi muốn xem ${newType}`)
        }
          // handleDoc(`tôi muốn mua ${newType}`)
           const setTimeNavi = setTimeout(()=>{ navigate(`/product-detail/${idProduct}`,{state : idProduct})
          resetTranscript()
          },1500)
      return ()=>clearTimeout(setTimeNavi);
          // navigate(`/product-detail/${idProduct}`,{state : idProduct})
          // resetTranscript();
          foundIdProduct= true
        }
        // else{
        //    message.error("Xin lỗi bạn hiện tại shop không có sản phẩm đó")
        //   resetTranscript();
        // }
      }
    }
    else{
      if(addCart){
        if (text.includes("thêm vào giỏ hàng")) {
          // setAddCartHeader(true)
          handleDoc(`thêm vào giỏ hàng`)
           const setTimeNavi = setTimeout(()=>{navigate("",{state: {addCartHeader: true}})
          resetTranscript() },1500)
      return ()=>clearTimeout(setTimeNavi);

          // navigate("",{state: {addCartHeader: true}}) 
      resetTranscript();
    }
      }
      else{
        if(seeCart){
           if (text.includes("xem giỏ hàng")) {
            handleDoc(`xem giỏ hàng`)
           const setTimeNavi = setTimeout(()=>{navigate(`/order`)
          resetTranscript() },1500)
      return ()=>clearTimeout(setTimeNavi);           
          // navigate(`/order`)
          // resetTranscript();
        }
        }
        else{
          if(suggest){
              handleDoc(`gợi ý sản phẩm`)
           const setTimeNavi = setTimeout(()=>{navigate(`/productsTrending`)
          resetTranscript() },1500)
      return ()=>clearTimeout(setTimeNavi);  
          // navigate(`/productsTrending`)
          // resetTranscript();
          }
          else{
            if(contact){
              handleDoc(`liên hệ`)
           const setTimeNavi = setTimeout(()=>{navigate(`/contact`)
          resetTranscript() },1500)
      return ()=>clearTimeout(setTimeNavi); 
          // navigate(`/contact`)
          // resetTranscript();
          }
          else{
            if(home){
                handleDoc(`Quay lại trang chủ`)
           const setTimeNavi = setTimeout(()=>{navigate(`/`)
          resetTranscript() },1500)
      return ()=>clearTimeout(setTimeNavi);   
          // navigate(`/`)
          resetTranscript();
          }
          else{
             if (text.includes("mua ngay")) {
               handleDoc(`chọn mua ngay`)
           const setTimeNavi = setTimeout(()=>{navigate("",{state: {buyNowHeader: true}})
          resetTranscript() },1500)
      return ()=>clearTimeout(setTimeNavi);   

      //      navigate("",{state: {buyNowHeader: true}}) 
      // resetTranscript();
        }
        else{
            if(text.includes("chọn sản phẩm số") ){
        const number = text.split('số')[1].trim();
        console.log("number",number)
        const id = getChecked(number)
         handleDoc(`chọn sản phẩm số ${number}`)
           const setTimeNavi = setTimeout(()=>{navigate("",{state: {numcheck: id}}) 
          resetTranscript() },1500)
      return ()=>clearTimeout(setTimeNavi);  
        // navigate("",{state: {numcheck: id}}) 
        // resetTranscript()
      }
      else{
         if (text.includes("thanh toán")) {
          handleDoc(`chọn thanh toán`)
           const setTimeNavi = setTimeout(()=>{navigate("",{state: {buy: true}})  
          resetTranscript() },1500)
      return ()=>clearTimeout(setTimeNavi);

      //      navigate("",{state: {buy: true}}) 
      // resetTranscript();
        }
        else{
           if (text.includes("ví")) {
            const namePay = text.split('ví')[1].trim();
            console.log("namePay",namePay)
            if(namePay==="momo"){
              handleDoc(`Thanh toán bằng ví mô mô`)
           const setTimeNavi = setTimeout(()=>{ navigate("",{state: {value: "Thanh toán bằng ví MoMo"}})   
          resetTranscript() },1000)
      return ()=>clearTimeout(setTimeNavi);
              // navigate("",{state: {value: "Thanh toán bằng ví MoMo"}}) 
            }
            else{            
              handleDoc(`Thanh toán bằng ví bây bồ`)
           const setTimeNavi = setTimeout(()=>{  navigate("",{state: {value: "Thanh toán bằng ví Paypal"}})   
          resetTranscript() },1000)
      return ()=>clearTimeout(setTimeNavi);
              // navigate("",{state: {value: "Thanh toán bằng ví Paypal"}}) 
            }
      // resetTranscript();
        }
        else{
          if (text.includes("khi nhận hàng")) { 
             handleDoc(`Thanh toán khi nhận hàng`)
           const setTimeNavi = setTimeout(()=>{ navigate("",{state: {value: "Thanh toán khi nhận hàng"}})   
          resetTranscript() },1000)
      return ()=>clearTimeout(setTimeNavi);        
      //         navigate("",{state: {value: "Thanh toán khi nhận hàng"}}) 
      // resetTranscript();
        }
        else{
           if (text.includes("đặt hàng")) {
            handleDoc(`chọn đặt hàng`)
           const setTimeNavi = setTimeout(()=>{navigate("",{state: {buy: true}})   
          resetTranscript() },1500)
      return ()=>clearTimeout(setTimeNavi);

      //      navigate("",{state: {buy: true}}) 
      // resetTranscript();
        }
        else{
          if (text.includes("đơn hàng")) {
             handleDoc(`Xem đơn hàng`)
           const setTimeNavi = setTimeout(()=>{ navigate("/my-order",{ state : {
          id: user?.id,
          token : user?.access_token
        }
      })   
          resetTranscript() },1500)
      return ()=>clearTimeout(setTimeNavi);
      //      navigate("/my-order",{ state : {
      //     id: user?.id,
      //     token : user?.access_token
      //   }
      // }) 
      // resetTranscript();
        }
        else{
          if (text.includes("tăng số lượng lên")) { 
            let number = text.split('lên')[1].trim();   
            if(number === "một"){
              number =1
            }
            if(number === "ba"){
              number =3
            }
             handleDoc(`tăng số lượng lên ${number}`)
           const setTimeNavi = setTimeout(()=>{ navigate("",{state: {numberIncrease: Number(number)}})
          resetTranscript() },1500)
      return ()=>clearTimeout(setTimeNavi);     
              // navigate("",{state: {numberIncrease: Number(number)}}) 
      resetTranscript();
        }
        }
        }
        }
        }
        }
      }
        }
          }
          }
          }
        }
      }
    }
  }

  }

  const startListening = () => {
    SpeechRecognition.startListening({ continuous:true ,  language: 'vi-VI'});
  }
  
  

  const stopListening = () => {
    SpeechRecognition.stopListening();
  }
  
//  eslint-disable-next-line react-hooks/rules-of-hooks
 useEffect(()=>{
  console.log("trans",transcript)
  const timeoutId = setTimeout(()=>{
 helpNavigateByVoice(transcript)
   resetTranscript()
      },1500)
        return () => clearTimeout(timeoutId);
        resetTranscript()
 },[transcript,addCartHeader])
 
  console.log("listening",listening)
    return ( 
      <div style={{width:"100%", background:isScrolled? "rgb(255,255,255,0.6)": adminPath ==="admin" ? "none":"rgb(32, 33, 38)", display:"flex", justifyContent:"center", flexDirection:"column",padding:isScrolled? "10px 30px":"20px 30px", position: isScrolled? "fixed":"", zIndex:"10",transition: "all 0.5s"}}>
        <WrapperHeader gutter={16} style={{justifyContent: isHiddenSearch && isHiddenCart ? "space-between" : "unset",marginRight:"0",marginLeft:"0"}}>
        <Col span={5} style={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
          <WrapperTextHeader style={{cursor:"pointer",color:isScrolled? "black":"#fff",}} onClick={()=> navigate("/")}><img style={{height:"50px"}} src={logo}/></WrapperTextHeader>  
          <span style={{cursor:"pointer", fontSize:"20px", color:isScrolled? "black":  adminPath === "admin" ? "#000": "#fff", display:"flex"}} onClick={listening === false ? startListening: stopListening}>{listening=== false ?<AudioMutedOutlined />:<AudioOutlined />}</span>
          {/* <span style={{cursor:"pointer", fontSize:"20px", color:"#fff", display:"flex"}} onClick={stopListening}><AudioMutedOutlined /> </span> */}
        </Col>
        {!isHiddenSearch && (

        <Col span={13}  >
            <div style={{display:"flex", justifyContent:"space-between"}}>
             <div style={{display:"flex", gap:"50px",justifyContent:"center", alignItems:"center",color:"#fff",padding: "10px 0",fontWeight: "bold",fontFamily: "math"}}>
        <WrapperButtonDropdown className="dropdown">
  <button className="dropdown-toggle buttonmenu" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{background:"none",color:isScrolled? "black":"#fff", border:"none",fontFamily:"math", fontWeight:"bold"}}>
    Danh mục
  </button>
  <ul className="dropdown-menu menu" aria-labelledby="dropdownMenuButton1">

      {typeProductContant?.map((type) => (
            typeProduct.includes(type.type) && (
               <li>
                <div style={{display:"flex", alignItems:"center", padding:"0 20px",color:"#000"}}>
                    <img style={{width:"20px", height:"20px"}} src={type.image}/>
                    <TypeProduct name={type.type} key={type.type} style={{color:"#000"}}/>
                </div>
               </li>
            )
        ))}
   
    
  </ul>
</WrapperButtonDropdown>
        <WrapperMenuItem className='news' style={{color:isScrolled? "black":"#fff"}}>Tin tức</WrapperMenuItem>
        <WrapperMenuItem className='trendingProducts' style={{color:isScrolled? "black":"#fff"}} onClick={()=> navigate("/productsTrending")} >Gợi ý sản phẩm</WrapperMenuItem>
        <WrapperMenuItem className='' style={{color:isScrolled? "black":"#fff"}} onClick={()=> navigate("/contact")}>Liên hệ</WrapperMenuItem>

      </div>
          
          <div className="dropdown">
  <button className="btn btn-secondary " style={{background:"none", border:"none"}} type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
     <SearchOutlined style={{color:isScrolled? "black":"#fff"}}/>
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenu2" style={{transform: "translate(0px, 50px)"}}>
    <ButtonInputSearch
      placeholder="input search text"
      size="large"
      // textButton ="Tìm kiếm"
      // bordered={false}
      backgroundColorInput="#fff"
      borderRadius="0px"
      border = "none"
      backgroundColorButton="none"
      width="300px"
      colorButton="#000"
      display = "flex"
      justifyContent = "center"
      alignItems= "center"
        onChange ={onSearch}
    />
  </ul>
</div>

            </div>

        </Col>

        )}
        <Col span={6} style={{display:"flex", gap: "54px", alignItems:"center", flex:"0 0 20%"}}>
        <Loading isLoading={loading}>
        <WrapperHeaderAccount>
          {user?.avatar?(
            <WrapperImgAvatar src={userAvatar} alt='avatar'/>
          ):(

        <UserOutlined style={{fontSize: '30px'}} />
          )}
        {user?.access_token ?(
          <>
          <Popover content={content} trigger="click">    
          <div  style={{cursor:"pointer",color:isScrolled? "black": adminPath === "admin" ? "#000": "#fff"}}>{username?.length  ? username : "User" }</div>
    </Popover>
          </>
        ) : (
        <div onClick={handleNavigateLogin} style={{cursor:"pointer"}}>
          <WrapperTextHeaderSmall >Đăng nhập / Đăng ký</WrapperTextHeaderSmall>
          <div>
          <WrapperTextHeaderSmall >Tài khoản</WrapperTextHeaderSmall>
          <CaretDownOutlined />
          </div>
        </div>
        )}

        </WrapperHeaderAccount>
        </Loading>
        {!isHiddenCart && (

        <div >      
        <WrapperCartHeader onClick={()=> navigate("/order")}>
        <Badge count={order?.orderItems?.length}>
        <ShoppingCartOutlined style={{fontSize: '30px',color:isScrolled? "black":"#fff"}}/>
        </Badge>
        <WrapperTextHeaderSmall style={{color:isScrolled? "black":"#fff"}}>Giỏ hàng</WrapperTextHeaderSmall>
        </WrapperCartHeader>
         
        </div>
        )}
        </Col>
      </WrapperHeader>
      
      </div>
     );
}

export default HeaderComPonent;