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
	render()
	{
		let {item} = this.props;
		return (
			<Grid>
				<Col style={styles.col1widget} size={1}>
					<Grid style={styles.griditem}>
						<Col size={2}>
							<Row>
								<Grid>
									<Row>
										<Col style={styles.col1widget}>
											<Image style={styles.logoTeam} source={{uri: item.info.team1.imageUrl}}/>
										</Col>
										<Col>
											<Text
												style={{color: '#000000'}}>{item.info.team1.teamName.toUpperCase()}</Text>
										</Col>
									</Row>
								</Grid>
							</Row>
							<Row>
								<Grid>
									<Row>
										<Col style={styles.col1widget}>
											<Image style={styles.logoTeam} source={{uri: item.info.team2.imageUrl}}/>
										</Col>
										<Col>
											<Text>{item.info.team2.teamName.toUpperCase()}</Text>
										</Col>
									</Row>
								</Grid>
							</Row>
						</Col>
						<Col size={1} style={styles.colin}>
							<Row style={{borderBottomColor: '#EEEEEE', borderBottomWidth: 1}}>
								<Text style={styles.txtBold}>
									<Icon name="ios-time" style={{fontSize: 15}}/>{'  ' + item.time}
								</Text>
							</Row>
							<Row style={{paddingTop: 5}}>
								<Text>
									<Icon name="ios-navigate" style={{fontSize: 15}}/>{'  ' + item.arena.name}
								</Text>
							</Row>
						</Col>
					</Grid>
				</Col>
			</Grid>
		);
	}
}

export default Gameitem;
