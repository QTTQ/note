// 前一页引入hashHistory
import { hashHistory } from 'React-router' 

btnClick: function () {
    hashHistory.push({
        pathname: '/apartmentReserve/' + yourApartmentId,
        query: {
            name: yourApartmentname,
            price: yourApartmentprice
        },
    })
}

// 或者通过 < Link > to 传参

    < Link to = {   
         {
    pathname: "/jump",
        hash: '#ahash',
            query: { foo: 'foo', boo: 'boo' },
    state: { data: 'hello' }
}   
    } > 点击跳转  
     </Link > 

// 后一页接收参数：

componentWillMount(){
    apartmentData = {
        apartmentId: this.props.params.apartmentId,
        name: this.props.location.query.name,
        price: this.props.location.query.price
    } 
}