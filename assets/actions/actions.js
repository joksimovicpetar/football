import { requests } from '../agent';
import {
    BLOG_POST_LIST_RECIEVED,
    BLOG_POST_LIST_ERROR,
    BLOG_POST_LIST_REQUEST,
    BLOG_POST_LIST_ADD,
    BLOG_POST_LIST,
    BLOG_POST_REQUEST,
    BLOG_POST_RECIEVED,
    BLOG_POST_ERROR,
    BLOG_POST_UNLOAD,
    CLUB_LIST_RECIEVED,
    CLUB_LIST_ERROR,
    CLUB_LIST_REQUEST,
    CLUB_LIST_ADD,
    CLUB_LIST,
    CLUB_REQUEST,
    CLUB_RECIEVED,
    CLUB_ERROR,
    CLUB_UNLOAD,
    CLUB_DELETE,
    CLUB_DELETED,
    CLUB_LIST_SET_PAGE,
    COMPETITION_LIST_RECIEVED,
    COMPETITION_LIST_ERROR,
    COMPETITION_LIST_REQUEST,
    COMPETITION_LIST_ADD,
    COMPETITION_LIST,
    COMPETITION_DELETE,
    COMPETITION_DELETED,  
    COMPETITION_REQUEST,
    COMPETITION_RECIEVED,
    COMPETITION_ERROR,
    COMPETITION_UNLOAD,
    COMPETITION_LIST_SET_PAGE,
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_ERROR,
    COMMENT_LIST_RECIEVED,
    COMMENT_LIST_UNLOAD,
    PERFORMANCE_LIST_REQUEST,
    PERFORMANCE_LIST_ERROR,
    PERFORMANCE_LIST_RECIEVED,
    PERFORMANCE_LIST_UNLOAD,
    GAME_LIST_REQUEST,
    GAME_LIST_ERROR,
    GAME_LIST_RECIEVED,
    GAME_LIST_UNLOAD,
    GAME_REQUEST,
    GAME_RECIEVED,
    GAME_ADDED,
    GAME_ERROR,
    HOST_UPDATE,
    COMM,
    USER_LOGIN_SUCCESS,
    USER_PROFILE_REQUEST,
    USER_PROFILE_ERROR,
    USER_PROFILE_RECIEVED,
    USER_SET_ID,
    COMMENT_ADDED,
    PERFORMANCE_ADDED,
    USER_LOGOUT,
    BLOG_POST_LIST_SET_PAGE,
    IMAGE_UPLOADED,
    IMAGE_UPLOAD_REQUEST,
    IMAGE_UPLOAD_ERROR,
    PLAYER_LIST_RECIEVED,
    PLAYER_LIST_ERROR,
    PLAYER_LIST_REQUEST,
    PLAYER_LIST_ADD,
    PLAYER_LIST,
    PLAYER_LIST_SET_PAGE,
    FOOTBALL_API_REQUEST, 
    FOOTBALL_API_RESPONSE, 
    FOOTBALL_API_ERROR ,
    FOOTBALL_API_RECIEVED

} from '../actions/constants'
import { SubmissionError } from 'redux-form';
import { parseApiErrors } from '../apiUtils'


export const blogPostListRequest = () => ({
    type: BLOG_POST_LIST_REQUEST,
});

export const blogPostListError = (error) => ({
    type: BLOG_POST_LIST_ERROR,
    error
});

export const blogPostListRecieved = (data) => ({
    type: BLOG_POST_LIST_RECIEVED,
    data
});

export const blogPostListSetPage = (page) => ({
    type: BLOG_POST_LIST_SET_PAGE,
    page

});


export const blogPostListFetch = (page = 1) => {
    return (dispatch) => {
        dispatch(blogPostListRequest());
        return requests.get(`/club?_page=${page}`, true)
            .then(response => {
                return dispatch(blogPostListRecieved(response))
            })
            .catch(error => dispatch(blogPostListError(error)))
    }
}

export const hostSelected = (host) => {
    return (dispatch) => {
        // dispatch(blogPostListRequest());
        // return requests.get(`/club?_page=${page}`, true)
        //     .then(response => {
                return dispatch(hostUpdated(host))
            // })
            // .catch(error => dispatch(blogPostListError(error)))
    }
}

export const host = (page = 1) => {
    return (dispatch) => {
        dispatch(hostUpdated());
        return requests.get(`/club?_page=${page}`, true)
            .then(response => {
                return dispatch(hostUpdated(response))
            })
            .catch(error => dispatch(hostUpdated(error)))
    }
}

export const hostUpdated = (host) => {
     return {
        type: HOST_UPDATE,
        host
     }
    
}

export const blogPostRequest = () => ({
    type: BLOG_POST_REQUEST,

})

export const blogPostError = (error) => ({
    type: BLOG_POST_ERROR,
    error
});

export const blogPostRecieved = (data) => ({
    type: BLOG_POST_RECIEVED,
    data
});

export const blogPostUnload = () => ({
    type: BLOG_POST_UNLOAD,

});

export const blogPostFetch = (id) => {
    return (dispatch) => {
        dispatch(blogPostRequest());
        return requests.get(`/club/${id}`, true)
            .then(response => dispatch(blogPostRecieved(response)))
            .catch(error => dispatch(blogPostError(error)))
    }
}

export const blogPostAdd = (title, content) => {
    return (dispatch) => {
        return requests.post('/club/new', {
            name: title
            // title: title,
            // content: content,
            // slug: title
        }
        ).catch(
            error => {
                if (error.response.status === 401) {
                    return dispatch(userLogout())
                }
                else if (error.response.status === 403) {
                    throw new SubmissionError({ _error: 'You do not have roghts to publish posts' })

                }

                throw new SubmissionError(parseApiErrors(error))
            }
        )
    }
}



export const clubListRequest = () => ({
    type: CLUB_LIST_REQUEST,

});

export const clubListError = (error) => ({
    type: CLUB_LIST_ERROR,
    error
});

export const clubListRecieved = (data) => ({
    type: CLUB_LIST_RECIEVED,
    data
});

export const clubListSetPage = (page) => ({
    type: CLUB_LIST_SET_PAGE,
    page

});


export const clubListFetch = (page = 1) => {
    return (dispatch) => {
        dispatch(clubListRequest());
        return requests.get(`/club?_page=${page}`, true)
            .then(response => {
                console.log('got iy', response)
                return dispatch(clubListRecieved(response))
            })
            .catch(error => dispatch(clubListError(error)))
    }
}



export const clubDelete = (id) => {
   return (dispatch) => {
        dispatch(clubDeleteRequest());
        return requests.delete(`/club/delete/${id}`, true)
            .then(response => {
                return dispatch(clubDeleted(response))
            })
            .catch(error => dispatch(clubListError(error)))
    }

};

export const clubDeleteRequest = () => ({
    type: CLUB_DELETE,
})

export const clubDeleted = () => ({
    type: CLUB_DELETED,

})

export const clubRequest = () => ({
    type: CLUB_REQUEST,

})

export const clubError = (error) => ({
    type: CLUB_ERROR,
    error
});

export const clubRecieved = (data) => ({
    type: CLUB_RECIEVED,
    data
});

export const clubUnload = () => ({
    type: CLUB_UNLOAD,

});

export const clubFetch = (id) => {
    return (dispatch) => {
        dispatch(clubRequest());
        return requests.get(`/club/${id}`, true)
            .then(response => dispatch(clubRecieved(response)))
            .catch(error => dispatch(clubError(error)))
    }
}

export const clubAdd = (title, content) => {
    return (dispatch) => {
        return requests.post('/club/new', {
            name: title
            // title: title,
            // content: content,
            // slug: title
        }
        ).catch(
            error => {
                if (error.response.status === 401) {
                    return dispatch(userLogout())
                }
                else if (error.response.status === 403) {
                    throw new SubmissionError({ _error: 'You do not have roghts to publish posts' })

                }

                throw new SubmissionError(parseApiErrors(error))
            }
        )
    }
}

export const competitionListRequest = () => ({
    type: COMPETITION_LIST_REQUEST,

});

export const competitionListError = (error) => ({
    type: COMPETITION_LIST_ERROR,
    error
});

export const competitionListRecieved = (competitions) => ({
    type: COMPETITION_LIST_RECIEVED,
    competitions
});

export const competitionListSetPage = (page) => ({
    type: COMPETITION_LIST_SET_PAGE,
    page

});

export const competitionListFetch = (page = 1) => {
    return (dispatch) => {
        dispatch(competitionListRequest());
        return requests.get(`/competition`, true)
            .then(response => {
                return dispatch(competitionListRecieved(response))
            })
            .catch(error => {
                return dispatch(competitionListError(error))
            }
               
                )
    }
}

export const competitionRequest = () => ({
    type: COMPETITION_REQUEST,

})

export const competitionError = (error) => ({
    type: COMPETITION_ERROR,
    error
});

export const competitionRecieved = (competition) => ({
    type: COMPETITION_RECIEVED,
    competition
});

export const competitionUnload = () => ({
    type: COMPETITION_UNLOAD,

});

export const competitionFetch = (id) => {
    return (dispatch) => {
        dispatch(competitionRequest());
        return requests.get(`/competition/${id}`, true)
            .then(response => {
                dispatch(competitionRecieved(response))})
            .catch(error => dispatch(competitionError(error)))
    }
}

export const competitionAdd = (competition) => {
    return (dispatch) => {
        if(competition.id) {
            return requests.update(`/competition/edit/${competition.id}`,competition
        ).catch(
            error => {
                // if (error.response.status === 401) {
                //     return dispatch(userLogout())
                // }
                // else 
                if (error.response.status === 403) {
                    throw new SubmissionError({ _error: 'You do not have rights to create competition' })

                }

                throw new SubmissionError(parseApiErrors(error))
            }
        )
        }

        return requests.post('/competition/new',competition
        ).catch(
            error => {
                if (error.response.status === 401) {
                    return dispatch(userLogout())
                }
                else if (error.response.status === 403) {
                    throw new SubmissionError({ _error: 'You do not have rights to create competition' })

                }

                throw new SubmissionError(parseApiErrors(error))
            }
        )
    }
}

export const competitionDelete = (id) => {
    return (dispatch) => {
         dispatch(competitionDeleteRequest());
         return requests.delete(`/competition/delete/${id}`, true)
             .then(response => {
                 return dispatch(competitionDeleted(response))
             })
             .catch(error => dispatch(competitionListError(error)))
     }
 
 };
 
 export const competitionDeleteRequest = () => ({
     type: COMPETITION_DELETE,
 })
 
 export const competitionDeleted = () => ({
     type: COMPETITION_DELETED,
 
 })

export const commentListRequest = () => ({
    type: COMMENT_LIST_REQUEST,

})

export const commentListError = (error) => ({
    type: COMMENT_LIST_ERROR,
    error
});

export const commentListRecieved = (data) => ({
    type: COMMENT_LIST_RECIEVED,
    data
});

export const commentListUnload = () => ({
    type: COMMENT_LIST_UNLOAD,

});

export const commentListFetch = (id) => {
    return (dispatch) => {
        dispatch(commentListRequest());
        return requests.get(`/club`, true)
            // return requests.get(`/club/${id}`)
            .then(response => dispatch(commentListRecieved(response)))
            .catch(error => dispatch(commentListError(error)))
    }
}

export const commentAdded = (comment) => ({
    type: COMMENT_ADDED,
    comment
});

export const commentAdd = (comment, blogPostId) => {
    return (dispatch) => {
        return requests.post('/club/new', {
            name: comment
            // content: comment,
            // blogPost: `/api/blog-posts/${blogPostId}`
        }
        ).then(
            response => {
                return dispatch(commentAdded(response))
            }
        ).catch(
            error => {
                if (error.response.status === 401) {
                    return dispatch(userLogout())
                }

                throw new SubmissionError(parseApiErrors(error))
            }
        )
    }
}


export const performanceListRequest = () => ({
    type: PERFORMANCE_LIST_REQUEST,

})

export const performanceListError = (error) => ({
    type: PERFORMANCE_LIST_ERROR,
    error
});

export const performanceListRecieved = (data) => ({
    type: PERFORMANCE_LIST_RECIEVED,
    data
});

export const performanceListUnload = () => ({
    type: PERFORMANCE_LIST_UNLOAD,

});

export const performanceListFetch = (id) => {
    return (dispatch) => {
        dispatch(performanceListRequest());
        return requests.get(`/performance`, true)
            // return requests.get(`/club/${id}`)
            .then(response => dispatch(performanceListRecieved(response)))
            .catch(error => dispatch(performanceListError(error)))
    }
}

export const performanceAdded = (performance) => ({
    type: PERFORMANCE_ADDED,
    performance
});

export const performanceAdd = (performance, blogPostId) => {
    return (dispatch) => {
        return requests.post('/club/new', {
            name: performance
            // content: comment,
            // blogPost: `/api/blog-posts/${blogPostId}`
        }
        ).then(
            response => {
                return dispatch(performanceAdded(response))
            }
        ).catch(
            error => {
                if (error.response.status === 401) {
                    return dispatch(userLogout())
                }

                throw new SubmissionError(parseApiErrors(error))
            }
        )
    }
}



export const gameListRequest = () => ({
    type: GAME_LIST_REQUEST,

})

export const gameListError = (error) => ({
    type: GAME_LIST_ERROR,
    error
});

export const gameListRecieved = (data) => ({
    type: GAME_LIST_RECIEVED,
    data
});

export const gameListUnload = () => ({
    type: GAME_LIST_UNLOAD,

});



export const gameListFetch = (id) => {
    return (dispatch) => {
        dispatch(gameListRequest());
        return requests.get(`/game`, true)
            // return requests.get(`/club/${id}`)
            .then(response => dispatch(gameListRecieved(response)))
            .catch(error => dispatch(gameListError(error)))
    }
}

export const gameRequest = () => ({
    type: GAME_REQUEST,

})

export const gameError = (error) => ({
    type: GAME_ERROR,
    error
});

export const gameRecieved = (game) => ({
    type: GAME_RECIEVED,
    game
});

// export const gameUnload = () => ({
//     type: BLOG_POST_UNLOAD,

// });

export const gameFetch = (id) => {
    return (dispatch) => {
        dispatch(gameRequest());
        return requests.get(`/game/${id}`, true)
            .then(response => dispatch(gameRecieved(response)))
            .catch(error => dispatch(gameError(error)))
    }
}

export const gameAdded = (game) => ({
    type: GAME_ADDED,
    game
});

export const gameAdd = (game, blogPostId) => {
    return (dispatch) => {
        return requests.post('/game/new', game)
        .then(
            response => {
                return dispatch(gameAdded(response))
            }
        ).catch(
            error => {
                if (error.response.status === 401) {
                    return dispatch(userLogout())
                }

                throw new SubmissionError(parseApiErrors(error))
            }
        )
    }
}

// export const commentAdded = (comment) => ({
//     type: COMMENT_ADDED,
//     comment
// });

export const userLoginSuccess = (token, userId) => {
    return {
        type: USER_LOGIN_SUCCESS,
        token,
        userId
    }
}

export const userLoginAttempt = (username, password) => {
    return (dispatch) => {
        return requests.post('/login_check', { username, password }, false).then(
            response => {
                 return dispatch(userLoginSuccess(response.token, username))}
        ).catch(error => {
            throw new SubmissionError(
                {
                    _error: 'Username od Password Invalid'
                }
            )
        })
    }
}

export const userLogout = () => {
    return {
        type: USER_LOGOUT
    }
}

export const userSetId = (userId) => {
    return {
        type: USER_SET_ID,
        userId
    }
}

export const userProfileRequest = () => {
    return {
        type: USER_PROFILE_REQUEST
    }
}

export const userProfileRecieved = (userData) => {
    return {
        type: USER_PROFILE_RECIEVED,
        userData,
        userId: userData.email
    }
}

export const userProfileError = (userId) => {
    return {
        type: USER_PROFILE_ERROR,
        userId
    }
}

export const userProfileFetch = (userId) => {
    return (dispatch) => {
        dispatch(userProfileRequest());
        return requests.get(`/user/${userId}`, true).then(
            response => dispatch(userProfileRecieved(response, response))
        ).catch(() => {
            dispatch(userProfileError(userId))
        })
    }
}


export const imageUploaded = (data) => {
    return {
        type: IMAGE_UPLOADED,
        image: data
    }
}

export const imageUploadRequest = () => {
    return {
        type: IMAGE_UPLOAD_REQUEST
    }
}

export const imageUploadError = () => {
    return {
        type: IMAGE_UPLOAD_ERROR
    }
}

export const imageUpload = (playerId, file) => {
    return (dispatch) => {
        dispatch(imageUploadRequest());
        return requests.upload('/player/new', player, file)
            .then(response => dispatch(imageUploaded(response)))
            .catch(error => dispatch(imageUploadError()))
    }
}


export const playerAdd = (player, file) => {
    return (dispatch) => {
        return requests.post('/player/new', player
        ).then(response => {
            console.log(response);
            console.log('Uploading image');
            return imageUpload(response.id, file)
        })
        .catch(
            error => {
                console.log('playerAdd error', error);
                // if (error.response.status === 401) {
                //     return dispatch(userLogout())
                // }
                // else
                //  if (error.response.status === 403) {
                //     throw new SubmissionError({ _error: 'You do not have roghts to publish posts' })

                // }

                // throw new SubmissionError(parseApiErrors(error))
            }
        )
    }
}

export const playerListRequest = () => ({
    type: PLAYER_LIST_REQUEST,

});

export const playerListError = (error) => ({
    type: PLAYER_LIST_ERROR,
    error
});

export const playerListRecieved = (data) => ({
    type: PLAYER_LIST_RECIEVED,
    data
});

export const playerListSetPage = (page) => ({
    type: PLAYER_LIST_SET_PAGE,
    page

});


export const playerListFetch = (page = 1) => {
    return (dispatch) => {
        dispatch(playerListRequest());
        return requests.get(`/player?_page=${page}`, true)
            .then(response => {
                return dispatch(playerListRecieved(response))
            })
            .catch(error => dispatch(playerListError(error)))
    }
}

export const footballApiFetch  = () => {
    return (dispatch) => {
        dispatch(footballApiFetchRequest());
        return requests.getFooballApi(`https://api.football-data.org/v2/competitions/CL/matches`, true)
            .then(response => {
                console.log('got the response2', response);
                return dispatch(footballApiFetchRecieved(response))
            })
            .catch(error => dispatch(footballApiFetchError(error)))
    }
}

export const footballApiFetchRequest = () => ({
    type: FOOTBALL_API_REQUEST,
});

export const footballApiFetchRecieved = (footballMatches) => ({
    type: FOOTBALL_API_RECIEVED,
    footballMatches
});

// export const footballApiFetchRecieved = (footballMatches) => {
//     console.log('rec invoked', matches)
//     return {
//         type: FOOTBALL_API_RECIEVED,
//         footballMatches
//     }
 
// };

export const footballApiFetchError = () => ({
    type: FOOTBALL_API_ERROR,
});