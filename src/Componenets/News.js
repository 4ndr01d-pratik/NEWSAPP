import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
export default class News extends Component {
  defImg = "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png";    
    
    static defaultProps = {
      country: 'in',
      pageSize: 12,
      category: 'general',
    }
    static propTypes = {
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string,
    }
    
    capitalizeFirstLetter = (string) =>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    capitalizeWord = (string) =>{
      return string.toUpperCase();
    }
    
    constructor(props){
        super(props);
        this.state ={
            articles : [],
            loading : true,
            page :  1,
            totalResults: 0,
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NQuick`;
    }

    async updateNews(){
      this.props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      this.props.setProgress(30);
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(this.state.page);
      this.setState({articles: parsedData.articles,totalResults : parsedData.totalResults, loading : false })
      this.props.setProgress(100);
    }
    async componentDidMount(){
       this.updateNews();
      }
    fetchData= async() =>{
      this.setState({page : this.state.page+1});     
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(this.state.page);
      this.setState({articles: this.state.articles.concat(parsedData.articles),totalResults : parsedData.totalResults, loading : false })
    }

    handleNext = async() =>{
      this.setState({page : this.state.page+1});     
      this.updateNews();
      
    }
    handlePrevious = async() =>{
      this.setState({page : this.state.page-1});
      this.updateNews();
        
    }
  render() {
    return (
      <>
      <div className='container my-3'>
        <div className='text-center'>
        <h3 className='my-5'>TOP {this.capitalizeWord(this.props.category)} HEADLINES</h3>
        {this.state.loading && <Spinner/>}
        </div>
        <InfiniteScroll
          dataLength={this.state.articles.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div classname="container-fluid">
        <div className="row">
        { this.state.articles.map((element)=>{
         return   (<div className='col-sm-3' key={element.url}>
            <NewsItem  title={element.title} description={element.description?element.description.slice(0,75):""} imgUrl={element.urlToImage?element.urlToImage:this.defImg} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}></NewsItem>
            </div>);
            })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-dark m-4" onClick={this.handlePrevious} disabled={this.state.page<=1}>Previous</button>
              <button type="button" className="btn btn-dark m-4" onClick={this.handleNext} disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}>Next</button>
            </div> */}
            </div>
      </>
    )
  }
}
