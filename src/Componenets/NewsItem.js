
import React from 'react'

const NewsItem = (props) => {
    
    let {title, description, imgUrl, newsUrl, author, date, source} = props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
          
            <img src={imgUrl} className="card-img-top" alt="..."></img>
            <span className='position-absolute badge badge-dark' style={{right: '1%', zIndex: '1'}}>{source}</span>
                <div className="card-body align-text-bottom">
                <a href={newsUrl}><h5 className="card-title">{title}</h5></a>
                <p className='card-text'><small className='text-muted'>By {author?author:"Anonymous"} on {new Date(date).toGMTString()}</small></p>
                <p className="card-text">{description}...</p>
            </div> 
        </div>
    </div>
    )
}
export default NewsItem


// export default class NewsItem extends Component {
    
//   render() {
//     let {title, description, imgUrl, newsUrl, author, date, source} = this.props;
//     return (
//       <div>
//         <div className="card" style={{width: "18rem"}}>
          
//             <img src={imgUrl} className="card-img-top" alt="..."></img>
//             <span className='position-absolute badge badge-dark' style={{right: '1%', zIndex: '1'}}>{source}</span>
//                 <div className="card-body align-text-bottom">
//                 <a href={newsUrl}><h5 className="card-title">{title}</h5></a>
//                 <p className='card-text'><small className='text-muted'>By {author?author:"Anonymous"} on {new Date(date).toGMTString()}</small></p>
//                 <p className="card-text">{description}...</p>
//             </div> 
//         </div>
//     </div>
//     )
//   }
// }
