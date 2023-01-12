import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
const News = (props) =>{
  
  const defImg = "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png";      
    
  const [articles,setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page,setPage] = useState(1);
  const [totalResults,setTotalResults] = useState(0);
  
    const capitalizeFirstLetter = (string) =>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const capitalizeWord = (string) =>{
      return string.toUpperCase();
    }
    
  

    const updateNews = async() =>{
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      props.setProgress(30);
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(page);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalReseults)
      setLoading(false)
      setPage(page + 1);
      props.setProgress(100);
    }

    useEffect(() =>{
      document.title = `${capitalizeFirstLetter(props.category)} - NQuick`;
      updateNews();
      // eslint-disable-next-line
    },[])
 
    const fetchData= async() =>{
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalReseults);
      setLoading(false);
      setPage(page+1)
    }

    // handleNext = async() =>{
    //   setState({page : page+1});     
    //   updateNews();
      
    // }
    // handlePrevious = async() =>{
    //   setState({page : page-1});
    //   updateNews();
        
    // }

    return (
      <>
      <div className='container my-3'>
        <div className='text-center'>
        <h3 className='text-center' style={{marginTop : '80px', marginBottom: '30px'}}>TOP {capitalizeWord(props.category)} HEADLINES</h3>
        {loading && <Spinner/>}
        </div>
        <InfiniteScroll
          dataLength={articles.length} //This is important field to render the next data
          next={fetchData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="container-fluid">
        <div className="row">
        { articles.map((element)=>{
         return   (<div className='col-sm-3' key={element.url}>
            <NewsItem  title={element.title} description={element.description?element.description.slice(0,75):""} imgUrl={element.urlToImage?element.urlToImage:defImg} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}></NewsItem>
            </div>);
            })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-dark m-4" onClick={handlePrevious} disabled={page<=1}>Previous</button>
              <button type="button" className="btn btn-dark m-4" onClick={handleNext} disabled={page + 1 > Math.ceil(totalResults/props.pageSize)}>Next</button>
            </div> */}
            </div>
      </>
    )
  
}

News.defaultProps = {
  country: 'in',
  pageSize: 12,
  category: 'general',
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News

// export default class News extends Component {
//   defImg = "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png";    
    
//     static defaultProps = {
//       country: 'in',
//       pageSize: 12,
//       category: 'general',
//     }
//     static propTypes = {
//       country: PropTypes.string,
//       pageSize: PropTypes.number,
//       category: PropTypes.string,
//     }
    
//     capitalizeFirstLetter = (string) =>{
//       return string.charAt(0).toUpperCase() + string.slice(1);
//     }
//     capitalizeWord = (string) =>{
//       return string.toUpperCase();
//     }
    
//     constructor(props){
//         super(props);
//         state ={
//             articles : [],
//             loading : true,
//             page :  1,
//             totalResults: 0,
//         }
//         document.title = `${capitalizeFirstLetter(props.category)} - NQuick`;
//     }

//     async updateNews(){
//       props.setProgress(10);
//       const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
//       setState({loading: true});
//       props.setProgress(30);
//       let data = await fetch(url);
//       let parsedData = await data.json();
//       console.log(page);
//       setState({articles: parsedData.articles,totalResults : parsedData.totalResults, loading : false,page : page+1 })
//       props.setProgress(100);
//     }
//     async componentDidMount(){
//        updateNews();
//       }
//     fetchData= async() =>{
//       setState({page : page+1});     
//       const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
//       let data = await fetch(url);
//       let parsedData = await data.json();
//       console.log(page);
//       setState({articles: articles.concat(parsedData.articles),totalResults : parsedData.totalResults, loading : false })
//     }

//     handleNext = async() =>{
//       setState({page : page+1});     
//       updateNews();
      
//     }
//     handlePrevious = async() =>{
//       setState({page : page-1});
//       updateNews();
        
//     }
//   render() {
//     return (
//       <>
//       <div className='container my-3'>
//         <div className='text-center'>
//         <h3 className='my-5'>TOP {capitalizeWord(props.category)} HEADLINES</h3>
//         {loading && <Spinner/>}
//         </div>
//         <InfiniteScroll
//           dataLength={articles.length} //This is important field to render the next data
//           next={fetchData}
//           hasMore={articles.length !== totalResults}
//           loader={<Spinner/>}
//         >
//         <div classname="container-fluid">
//         <div className="row">
//         { articles.map((element)=>{
//          return   (<div className='col-sm-3' key={element.url}>
//             <NewsItem  title={element.title} description={element.description?element.description.slice(0,75):""} imgUrl={element.urlToImage?element.urlToImage:defImg} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}></NewsItem>
//             </div>);
//             })}
//         </div>
//         </div>
//         </InfiniteScroll>
//         {/* <div className="d-flex justify-content-between">
//               <button type="button" className="btn btn-dark m-4" onClick={handlePrevious} disabled={page<=1}>Previous</button>
//               <button type="button" className="btn btn-dark m-4" onClick={handleNext} disabled={page + 1 > Math.ceil(totalResults/props.pageSize)}>Next</button>
//             </div> */}
//             </div>
//       </>
//     )
//   }
// }
