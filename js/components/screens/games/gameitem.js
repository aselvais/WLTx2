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
	 * @param s
	 * @returns {*}
	 */
	getScoreTxt(s)
	{
		if (!s && parseInt(s) !== 0) return '-';
		return s;
	}

	/**
	 *
	 * @param txt
	 * @param isWinner
	 * @returns {Array}
	 */
	getTeamNameJsx(txt='', isWinner=false)
	{
		let jsx = [];
		let txt0 = txt.trim().split(' ');
		let txt2 = txt0.pop();
		let txt1 = txt0.join(' ');
		let tcolor = '#000000';
		let tweight = 'normal';
		if (isWinner)
		{
			tweight = 'bold';
			tcolor = '#3F51B5';
		}

		if (txt1 != '') jsx.push(<Text key={1} style={{color: tcolor, fontWeight: tweight, fontSize: 11, textAlign: 'left'}}>{txt1}</Text>);
		if (txt2 != '') jsx.push(<Text key={2} style={{color: tcolor, fontWeight: tweight,  fontSize: 14}}>{txt2}</Text>);

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
											{this.getTeamNameJsx(
												item.info.team1.teamName.toUpperCase(),
												(parseInt(item.info.team1.score) > parseInt(item.info.team2.score))
											)}
										</Col>
										<Col style={styles.colScores}>
											<Text style={styles.scoretxt}>{ this.getScoreTxt(item.info.team1.score) }</Text>
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
											{this.getTeamNameJsx(
												item.info.team2.teamName.toUpperCase(),
												(parseInt(item.info.team1.score) < parseInt(item.info.team2.score))
											)}
										</Col>
										<Col style={styles.colScores}>
											<Text style={styles.scoretxt}>{ this.getScoreTxt(item.info.team2.score) }</Text>
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
