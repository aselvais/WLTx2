import React, {Component} from "react";
import {Image, Text} from "react-native";
import {Icon} from "native-base";
import {Col, Grid, Row} from "react-native-easy-grid";
import styles from "./gameitemstyles";

/**
 *
 */
class Gameitem extends Component
{

	/**
	 *
	 * @param txt
	 * @returns {Array}
	 */
	getTeamNameJsx(txt='')
	{
		let jsx = [];
		let txt0 = txt.split(' ');
		let txt2 = txt0.pop();
		let txt1 = txt0.join(' ');

		if (txt1 != '') jsx.push(<Text key={1} style={{color: '#000000', fontSize: 11, textAlign: 'left'}}>{txt1}</Text>);
		if (txt2 != '')jsx.push(<Text key={2} style={{color: '#000000', fontSize: 14}}>{txt2}</Text>);

		return jsx;
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		let {item} = this.props;
		return (
			<Grid>
				<Col style={styles.col1widget} size={1}>
					<Grid style={styles.griditem}>
						<Col>
							<Row>
								<Grid>
									<Row>
										<Col style={styles.col12widget}>
											<Image style={styles.logoTeam} source={{uri: item.info.team1.imageUrl}}/>
										</Col>
										<Col style={styles.colTeamName}>
											{this.getTeamNameJsx(item.info.team1.teamName.toUpperCase())}
										</Col>
										<Col style={styles.colScores}>
											<Text style={styles.scoretxt}>{ item.info.team1.score }</Text>
										</Col>
									</Row>
								</Grid>
							</Row>
							<Row>
								<Grid>
									<Row>
										<Col style={styles.col12widget}>
											<Image style={styles.logoTeam} source={{uri: item.info.team2.imageUrl}}/>
										</Col>
										<Col style={styles.colTeamName}>
											{this.getTeamNameJsx(item.info.team2.teamName.toUpperCase())}
										</Col>
										<Col style={styles.colScores}>
											<Text style={styles.scoretxt}>{ item.info.team2.score }</Text>
										</Col>
									</Row>
								</Grid>
							</Row>
						</Col>
						<Col style={styles.colin}>
							<Row style={{borderBottomColor: '#EEEEEE', borderBottomWidth: 1, alignItems: 'center', alignSelf: 'center'}}>
								<Text style={styles.txtBold}>{item.time}</Text>
							</Row>
							<Row style={{paddingTop: 5, alignItems: 'center', alignSelf: 'center'}}>
								<Text>{item.arena.name}</Text>
							</Row>
						</Col>
					</Grid>
				</Col>
			</Grid>
		);
	}
}

export default Gameitem;
