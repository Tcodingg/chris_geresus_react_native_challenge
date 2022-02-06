export enum actionTypes {
   JOKE_LOADING = "JOKE_LOADING",
   JOKE_SUCCESS = "JOKE_SUCCESS",
   JOKE_FAIL = "JOKE_FAIL",
   OPEN_PUNCHLINE = "OPEN_PUNCHLINE",
   CLOSE_PUNCHLINE = "CLOSE_PUNCHLINE",
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

type actionOpenPunchline = {
   type: actionTypes.OPEN_PUNCHLINE;
   payload: boolean;
};
type actionClosePunchline = {
   type: actionTypes.CLOSE_PUNCHLINE;
   payload: boolean;
};

export type Actions =
   | actionJokeLoading
   | actionJokeSuccess
   | actionJokeFail
   | actionOpenPunchline
   | actionClosePunchline;
