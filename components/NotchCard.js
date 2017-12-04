import React from 'react'

import {
  Avatar, Typography, IconButton
} from 'material-ui'
import Card, {CardHeader, CardMedia, CardContent, CardActions} from 'material-ui/Card'
import {
  MoreVertIcon, ExpandMoreIcon, FavoriteIcon, ShareIcon
} from 'material-ui-icons'
import { red } from 'material-ui/colors'

const NotchCard = (props) => (
  <Card style={{margin: 20}}>
    <CardHeader
      avatar={
        <Avatar aria-label="Recipe" style={{backgroundColor: "red"}}>
          {props.avatarLetter}
        </Avatar>
      }
      action={
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      }
      title={props.title}
      subheader={props.timestamp}
    />
    <CardMedia image={props.imgUrl} title="Image Title" >
      <img src={props.imgUrl} style={{width:"100%", height: "300px"}}/>
    </CardMedia>
    <CardContent>
      <Typography component="p">
        {props.description}
      </Typography>
    </CardContent>
  </Card>
)

export default NotchCard
