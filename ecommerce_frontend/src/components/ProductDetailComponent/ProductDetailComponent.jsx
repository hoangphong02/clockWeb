  import { Col, Image, InputNumber, Rate, Row, message } from 'antd'
  import React, { useEffect, useState } from 'react'
  // import imageProduct from '../../assets/images/test.webp'
  // import imageSmallProduct from '../../assets/images/imageSmall.webp'
  import { WrapperAddress, WrapperBtnBuyCart, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleNameProduct, WrapperStyleTextSell, WrapperStyledColImage, WrapperStyledImageSmall, WrapperTextQuality } from './style'
  import { CloudFilled, MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons'
  import ButtonComponent from '../ButtonComponent/ButtonComponent'
  import * as ProductService from '../../services/ProductService'
  import { useDispatch, useSelector } from 'react-redux'
  import { useLocation, useNavigate, useParams } from 'react-router'
  import { addOrderProduct } from '../../redux/slides/oderSlide'
  import QRCodeComponent from '../QRCode/QRCode'
  import { useMutationHook } from '../../hooks/useMutationHook'


  const ProductDetailComponent = ({idProduct,addCart,buyNow,numberIncrease}) => {
      const [numberProduct, setNumberProduct]= useState(1)
      const [isFollowerProduct, setIsFollowerProduct] = useState(false)

      const user = useSelector((state) => state?.user)
      const navigate =useNavigate()
      const location = useLocation()
      const dispatch= useDispatch()
      const order = useSelector((state)=>state.order )
      console.log("user",user?.address)
      console.log("order",order?.orderItems)
      const onChange= (value)=>{
          console.log("onChange is called with value:", value);
          if(value> stateProductDetails?.countInStock){
            setNumberProduct(stateProductDetails?.countInStock)
          }
          else{
            setNumberProduct(value)
          }
      }
      console.log("addCart",addCart)

      const handleIncrease = ()=>{
          if(numberProduct === stateProductDetails.countInStock){
              setNumberProduct( numberProduct)
          }
          else{

              setNumberProduct( numberProduct+ 1)
          }
      }
      const handleDecrease = ()=>{
          if(numberProduct === 1){
              setNumberProduct( numberProduct)
          }
          else{
              setNumberProduct( numberProduct -1)
          }
      }

      console.log("productId",idProduct)
      const [stateProductDetails, setStateProductDetails] = useState({
          name: '',
      price: '',
      description: '',
      rating: '',
      image: '',
      type: '',
      countInStock: '',
      newType: '',
      discount:'',
      selled:'',
      _id:'',
      followers:[]
      })

      const fetchGetDetailsProduct = async (idProduct) => {
      const res = await ProductService.getDetailProduct(idProduct)
      if (res?.data) {
        setStateProductDetails({
          _id:res?.data?._id,
          name: res?.data?.name,
          price: res?.data?.price,
          description: res?.data?.description,
          rating: res?.data?.rating,
          image: res?.data?.image,
          type: res?.data?.type,
          countInStock: res?.data?.countInStock,
          discount: res?.data?.discount,
          selled: res?.data?.selled,
          followers: res?.data?.followers
        })
      }
    }
    
    const isFollower = async ()=>{
      if (stateProductDetails?.followers && Array.isArray(stateProductDetails?.followers)){
        const isFollow = await stateProductDetails?.followers.find((product) => product.user === user?.id);
        if(isFollow){
          setIsFollowerProduct(true)
        }
        else{
          setIsFollowerProduct(false)
        }
      }
    }

      useEffect(() => {
      if (idProduct) {
      //   setIsLoadingUpdate(true)
        fetchGetDetailsProduct(idProduct)
      }
    }, [idProduct])

    useEffect(() => {
     isFollower();  
    }, [stateProductDetails, user]); 
    
    console.log("stateProduct", stateProductDetails.followers)
    console.log("location",location)
    console.log("follow", isFollowerProduct)

    const handleAddOderProduct =()=>{
      if(!user?.id){
        navigate('/sign-in',{state: location?.pathname})
      }
      else{
        dispatch(addOrderProduct({
          orderItem:{
            name: stateProductDetails?.name,
            amount: numberProduct,
          image: stateProductDetails?.image,
          price: stateProductDetails?.price ,
          product: stateProductDetails?._id ,
          discount: stateProductDetails?.discount,
          countInStock: stateProductDetails?.countInStock,
          
          }
        }))
        message.success("Thêm vào giỏ hàng thành công")
      }
    }
    const handleBuyNow =()=>{
      if(!user?.id){
        navigate('/sign-in',{state: location?.pathname})
      }
      else{
        dispatch(addOrderProduct({
          orderItem:{
            name: stateProductDetails?.name,
            amount: numberProduct,
          image: stateProductDetails?.image,
          price: stateProductDetails?.price ,
          product: stateProductDetails?._id ,
          discount: stateProductDetails?.discount,
          countInStock: stateProductDetails?.countInStock,
          
          }
        }))
        navigate("/order")
        message.success("Thêm vào giỏ hàng thành công")
      }
    }
    const mutationDeleted = useMutationHook(
      (data) => {
        const { id,
          token,
        } = data
        const res = ProductService.deleteFollower(
          id,
          token)
        return res
      },
    )

      const mutationAddFollower = useMutationHook(
      (data) => {
        const { id,
          token,
          ...rests } = data
        const res = ProductService.addFollower(
          id,
          token,
          { ...rests })
        return res
      },
    )
      const { data: dataAddFollower, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationAddFollower
  const onAddFollower = () => {
      mutationAddFollower.mutate({ id: idProduct, token: user?.access_token,followers: [{
        name: user?.name,
        email:user?.email,
        user: user?.id,
        product: idProduct
      }] })
    }
    
    const onDeleteFollower = () => {
      mutationDeleted.mutate({ id: user?.id, token: user?.access_token }, {
      })
    }

    const onHandleFollower = ()=>{
      if(isFollowerProduct === false){
        onAddFollower()
        setIsFollowerProduct(true)
      }
      else{
        onDeleteFollower()
        setIsFollowerProduct(false)
      }
    }

    useEffect(()=>{
      if(addCart=== true){
      handleAddOderProduct()
      }
    },[addCart])
    useEffect(()=>{
      if(buyNow=== true){
      handleBuyNow() 
      }
    },[buyNow])
    

    const getAmountProductInCart= async (num)=>{
        const foundProduct = await order?.orderItems?.find((pro)=> pro?.product === idProduct)
        console.log("foundProduct",foundProduct)
        if(foundProduct){
          if(num +foundProduct?.amount > foundProduct?.countInStock ){
            message.error("Số lượng sản phẩm trong kho không đủ")
            setNumberProduct(foundProduct?.countInStock - foundProduct?.amount)
          }
        }
    }

    useEffect(()=>{
      getAmountProductInCart(numberProduct)
      
    },[numberProduct])




    useEffect(()=>{
      console.log("Number",numberIncrease)
      if(numberIncrease > 0 ){
        setNumberProduct((prev)=> prev + numberIncrease)
      }
    },[numberIncrease])

    return (
      <Row style={{background: "#fff", padding: "16px"}} >
          <Col span={10} >
              <Image src={stateProductDetails?.image} alt="Image Product" preview={true}/>
              {/* <Row style={{paddingTop:"10px", justifyContent:" space-between"}}>
                  <WrapperStyledColImage span={4}>
                      <WrapperStyledImageSmall src={imageSmallProduct} alt='imageSmall' preview={false}/>
                  </WrapperStyledColImage>
                  <WrapperStyledColImage span={4}>
                      <WrapperStyledImageSmall src={imageSmallProduct} alt='imageSmall' preview={false}/>
                  </WrapperStyledColImage>
                  <WrapperStyledColImage span={4}>
                      <WrapperStyledImageSmall src={imageSmallProduct} alt='imageSmall' preview={false}/>
                  </WrapperStyledColImage>
                  <WrapperStyledColImage span={4}>
                      <WrapperStyledImageSmall src={imageSmallProduct} alt='imageSmall' preview={false}/>
                  </WrapperStyledColImage>
                  <WrapperStyledColImage span={4}>
                      <WrapperStyledImageSmall src={imageSmallProduct} alt='imageSmall' preview={false}/>
                  </WrapperStyledColImage>
                  <WrapperStyledColImage span={4}>
                      <WrapperStyledImageSmall src={imageSmallProduct} alt='imageSmall' preview={false}/>
                  </WrapperStyledColImage>
              </Row> */}
          </Col>
        <Col span={14} style={{paddingLeft: "10px", display: "flex", flexDirection:"column", flexWrap: "nowrap", overflow:"hidden"}}>
          <WrapperStyleNameProduct>
          {stateProductDetails?.name}
          </WrapperStyleNameProduct>
          <div>
          <Rate allowHalf defaultValue={stateProductDetails?.rating} value={stateProductDetails?.rating} />
          <WrapperStyleTextSell> | Đã bán {stateProductDetails?.selled ? stateProductDetails?.selled : 0}+</WrapperStyleTextSell>     
          </div>
          <WrapperPriceProduct>
          <WrapperPriceTextProduct>{stateProductDetails?.price.toLocaleString()} vnd</WrapperPriceTextProduct>
          <div style={{fontSize: "16px",fontFamily: "ui-monospace"}}>
            {stateProductDetails?.description}
          </div>
          </WrapperPriceProduct>
          <WrapperAddress style={{marginTop: "20px"}}>
              <span>Giao đến</span>
              <span className='address'> {user?.address}</span> - 
              <span className='changeAddress'> Đổi địa chỉ </span>
          </WrapperAddress>
          <div>
              <WrapperTextQuality>Số lượng</WrapperTextQuality>
              <WrapperQualityProduct>
              <ButtonComponent icon={<MinusOutlined style={{color:"#000"}}/>} onClick={handleDecrease}/>
              <WrapperInputNumber min={1} max={stateProductDetails?.countInStock }  value={numberProduct} onChange={onChange} />
              <ButtonComponent icon={<PlusOutlined style={{color:"#000", textAlign:"center"}}/> } onClick ={handleIncrease}/>
              </WrapperQualityProduct>
          </div>
          <WrapperBtnBuyCart>
              <ButtonComponent
              size={20} 
              style={{background: "rgb(255, 66, 78)", borderRadius: "4px", border: "none", height:"48px", width:"220px", fontSize:"15px"}}
              textButton={"Thêm vào giỏ hàng"}
                styleTextButton={{color: "#fff"}}
                onClick={handleAddOderProduct}></ButtonComponent>
                <ButtonComponent
              size={20} 
              style={{background: "rgb(255, 66, 78)", borderRadius: "4px", border: "none", height:"48px", width:"220px", fontSize:"15px"}}
              textButton={"Mua ngay"}
                styleTextButton={{color: "#fff"}}
                onClick={handleBuyNow}></ButtonComponent>
              <ButtonComponent
              size={20} 
              style={{background: isFollowerProduct === false? "#fff": "rgb(31 58 201)", borderRadius: "4px", border: "1px solid rgb(10, 104, 255)", height:"48px", width:"220px", fontSize:"15px"}}
              textButton={ isFollowerProduct === false? "Theo dõi":"Đã theo dõi"}
                styleTextButton={{color:isFollowerProduct === false? "rgb(10, 104, 255)":"#fff"}}
                onClick={onHandleFollower}
                ></ButtonComponent> 
          </WrapperBtnBuyCart>
          {/* <QRCodeComponent productId={idProduct}/> */}
        </Col>
      </Row>
    )
  }

  export default ProductDetailComponent