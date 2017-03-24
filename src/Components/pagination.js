import React,{Component} from 'react';
import _ from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import {withRouter} from 'react-router';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
     
    }

    componentWillMount() {
        this.setPage(this.props.page,this.props.items);
    }
    componentWillReceiveProps(next){
        if(this.props.page !== next.page){
            this.setPage(next.page,next.items)
        }
        if(!_.isEqual(next.items,this.props.items) && next.items.length !== 0){
            this.setPage(1,next.items)
        }
    }
    setPage(page,list) {
        var items = list;
        var pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(items.length, page);

        // get new page of items from items array
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager: pager });

        // call change page function in parent component
        this.props.onChangePage(pageOfItems);
    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 6;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = _.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        var pager = this.state.pager;
        let items = this.props.items;
        let page = parseInt(this.props.page);
        return (
            <div className="pagination" style={{marginTop:'20px'}}>
               {    page === 1 ? " ":
                   <RaisedButton label="Previous" style={{float:'left',marginLeft:'50px'}} primary={true} onClick={() => this.props.history.push(`/pages/${page-1}`) } />
               } 

               {
                    page === pager.totalPages? " ":
                    <RaisedButton label="Next" primary={true} style={{float:'right',marginRight:'50px'}} onClick={() => this.props.history.push(`/pages/${page+1}`) } />
               }
            </div>
        );
    }
}

Pagination = withRouter(Pagination);
export default Pagination;