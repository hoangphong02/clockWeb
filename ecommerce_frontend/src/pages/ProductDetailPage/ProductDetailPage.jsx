import React, { useEffect, useRef, useState } from 'react'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent'
import { useLocation, useNavigate, useParams } from 'react-router'
import { useMutationHook } from '../../hooks/useMutationHook'
import * as EvaluateService from '../../services/EvaluateService'
import { useSelector } from 'react-redux'
import { Input, Rate, message } from 'antd'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useQuery } from '@tanstack/react-query'

const ProductDetailPage = () => {
  const navigate =useNavigate()
  const user = useSelector((state)=> state.user)
  const product =useSelector((state)=> state?.product)
    const [addCart,setAddCart] = useState(false)
    const [buyNow,setBuynow] = useState(false)
    const [valueRating,setValueRating] = useState(0)
    const [numberIncrease,setNumberIncrease] = useState(0)

  const {id} = useParams()
  // const {state}= useLocation()
  const location =useLocation()
  
  const [description, setDescription] = useState('')
  const addCartHeader = location.state?.addCartHeader || false;
  const buyNowHeader = location.state?.buyNowHeader || false;
  const numberIncreaseFromState = location.state?.numberIncrease || 0;

  console.log("numberIncrease",numberIncreaseFromState)

  console.log("product",product)
    console.log("params",id)
 
    console.log("addCartHeader",addCartHeader)
     const mutationAddEvaluate = useMutationHook(
    (data) => {
      console.log("dataUser",data)
      const { 
        token,
        ...rests } = data
      const res = EvaluateService.createEvaluate(
          { ...rests }, token)
      return res
    },
  )
 
const { data: dataAdd, isLoading: isLoadingAdd, isSuccess: isSuccsess, isError: isError } = mutationAddEvaluate
      const handleAddEvaluate = () => {
    if(user?.access_token  ) {
        // eslint-disable-next-line no-unused-expressions
        mutationAddEvaluate.mutate(
          { token: user?.access_token, 
            name:user?.name,
            avatar:user?.avatar,        
            description:description,
            rating:valueRating,
            user: user?.id,
            product: id
          }
        ), {
          onSuccess:()=>{
            queryEvaluate.refetch()
          }
        }
      }
  }
  const onChange =(e)=>{
  setDescription(e.target.value)
  }
  console.log("description", description)

  
  console.log("user",user)

   const fetchMyEvaluate = async()=>{
      const res = await EvaluateService.getEvaluateByProductId(id, user?.access_token)
      return res.data
    }

    const queryEvaluate =useQuery({queryKey:['evaluate'], queryFn: fetchMyEvaluate})
    const { isLoading, data } = queryEvaluate

    console.log("dataComm",data)
    useEffect(() => {
    if (isSuccsess && dataAdd?.status === 'OK') {
      message.success("Bình luận thành công")
      queryEvaluate.refetch()
      setDescription("")
      setValueRating(0)
    } else if (isSuccsess && dataAdd?.status === 'ERR') {
      message.error(dataAdd?.message)
    }
  }, [isSuccsess,isError])
    
function formatDateTime(dateTimeString, locale = 'vi-VN') {
  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
   
  }).format(new Date(dateTimeString));

  return formattedDate;
}

  const mutationDeleted = useMutationHook(
    (data) => {
      const { id,
        token,
      } = data
      const res = EvaluateService.deleteEvaluate(
        id,
        token)
      return res
    },
  )
  
  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
  const handleDeleteEvaluate = (id) => {
    mutationDeleted.mutate({ id: id, token: user?.access_token }, {
      onSettled: () => {
        queryEvaluate.refetch()
      }
    })
  }

  useEffect(() => {
    if (isSuccessDelected && dataDeleted?.status === 'OK') {
      message.success("Xóa bình luận thành công")
      // queryEvaluate.refetch()
    } else if (isErrorDeleted) {
      message.error("Xóa không thành công")
    }
  }, [isSuccessDelected])




    

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(()=>{
    setAddCart(addCartHeader)
  },[addCartHeader])
  useEffect(()=>{
    setBuynow(buyNowHeader)
  },[buyNowHeader])

  const previousNumberIncreaseRef = useRef(null);
  useEffect(() => {
  if (numberIncreaseFromState !== previousNumberIncreaseRef.current) {
    setNumberIncrease(numberIncreaseFromState);
    previousNumberIncreaseRef.current = numberIncreaseFromState;
  }
    }, [numberIncreaseFromState]);

  useEffect(()=>{
    setNumberIncrease(numberIncreaseFromState)
  },[numberIncreaseFromState])
  console.log("valuerATIN", valueRating)

  return (
    <div style={{padding: "0 120px", background:"#efefef "}}>
      <h3 style={{margin:"0", fontSize:"15px", padding:"15px 0"}}><span style={{cursor:"pointer"}} onClick={()=> navigate("/")}>Trang chủ</span> - Chi tiết sản phẩm</h3>
      <ProductDetailComponent idProduct = {id} addCart={addCart} buyNow={buyNow} numberIncrease={numberIncrease}/>
       <div style={{padding:"30px 0 0 0", fontSize:"25px", fontWeight:"bold"}}>Bình luận và đánh giá</div>
      {/* <div style={{margin:"30px 0", display:"flex",gap:"10px",alignItems:"center"}}>
      <img src={user?.avatar} style={{width:"40px", height:"40px", borderRadius:"50%", objectFit:"cover"}}/>
      <div style={{width:"100%",lineHeight:"2"}}>
      <Rate onChange={setValueRating} value={valueRating} />
      <Input placeholder="Add evaluate" value={description} onChange={onChange} />
      </div>
      <ButtonComponent textButton={"evaluate"} onClick={()=>handleAddevaluate()}/>
      </div> */}
      <div>
        {
          data?.map((evaluate)=>{
            return(
          <div style={{margin:" 10px 0 ",display:"flex",alignItems:"center"}}>
          <div >
          <img src={evaluate?.avatar} alt='avatar' style={{height:"40px", width:'40px', borderRadius:"50%",margin:"0 10px"}}/>
          </div>
          <div style={{ background: "#ccc",padding: "15px", borderRadius: "15px", width:"689px", overflow:"hidden"}}>
          <span style={{fontWeight:"800"}}>{evaluate?.name}</span> <span>{formatDateTime(evaluate.updatedAt)}</span>
          <div >{evaluate?.description}</div>
          <div>
            <Rate defaultValue={evaluate?.rating} value={evaluate?.rating}/>
          </div>
          <div style={{display:"flex", float:"right"}}>
          {user?.isAdmin ? <ButtonComponent textButton={"Xóa"} onClick={()=>handleDeleteEvaluate(evaluate?._id)}/>:("")}
          </div>
          </div>
        </div>
            )
          })
        }
        
      </div>
    </div>
  )
}

export default ProductDetailPage




