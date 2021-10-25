import '../css/animeList.css'



import React, { Component } from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';

import { CardActionArea } from '@mui/material';
import { fetchAnime } from '../actions/animeActions'
import { connect } from 'react-redux'

import { ThemeProvider } from '@mui/material/styles';
import truncateString from '../js/math';
class AnimeList extends Component {
    constructor(props) {
        super();
        this.state = {
            list: null,
        };
      }

	componentDidMount() {
		console.log('componentWillMount()')

		console.log("AnimeList component mounted with these props:")
		console.log(this.props)
		console.log('fetching '+ this.props.header)
		this.props.fetchAnime(this.props.resource, this)
	}

	updateList = (array) => {
		console.log('updateList()')

		console.log('current state is:')
		console.log(this.state)
		console.log('updating state with: ')
		console.log(array)
		this.setState({
			list: array
		})
		console.log('updated state is:')
		console.log(this.state)
	}

	render() {
		console.log('rendering ' + this.props.header + ' AnimeList component...')
		console.log(this.props)
		console.log(this.state)
		const array = this.state.list || this.props.anime
		const images = array.map((data, key) =>

			<div key={key} className='card'>

				<Card sx={{ maxWidth: 250, maxHeight: 600 }}>
					      <CardActionArea>

				<CardMedia
					component='img'
					alt={data.mal_id}
					height='400'
					image={data.image_url}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{truncateString(data.title, 13)}
					</Typography>
					{/* <Typography variant="body2" color="text.secondary">
						{truncateString(data.synopsis, 50)}
					</Typography> */}
				</CardContent>
				</CardActionArea>
				</Card>
				</div>

		)

		return (
			<div className='animeList'>
				<h2 className='listHeader'>{this.props.header}</h2>
				<div className='results'>
					<div className='scrollingWrapper'>
					<ThemeProvider theme={this.props.theme}>
						{images}
					</ThemeProvider>
					</div>
				</div>
			</div>

		)
	}
}

const mapStateToProps = (state) => {
	return {
		anime: state.anime,
		loading: state.loading,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchAnime: (resource, element) => dispatch(fetchAnime(resource, element)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimeList)