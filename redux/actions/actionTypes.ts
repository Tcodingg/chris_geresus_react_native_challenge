export enum actionTypes {
   JOKE_LOADING = "JOKE_LOADING",
   JOKE_SUCCESS = "JOKE_SUCCESS",
   JOKE_FAIL = "JOKE_FAIL",
   SHOW_PUNCHLINE = "SHOW_PUNCHLINE",
   HIDE_PUNCHLINE = "HIDE_PUNCHLINE",
}

export interface jokeTypes {
   setup?: string;
   delivery?: string;
   joke?: string;
}

// === action types === //
type actionJokeLoading = {
   type: actionTypes.JOKE_LOADING;
};

type actionJokeSuccess = {
   type: actionTypes.JOKE_SUCCESS;
   payload: jokeTypes;
};

type actionJokeFail = {
   type: actionTypes.JOKE_FAIL;
   payload: any;
};

export type Actions = actionJokeLoading | actionJokeSuccess | actionJokeFail;
