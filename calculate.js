function calculateSurveyResults(survey){
console.log("what calculate receives",survey);
  var options_ct = 0;
  var participant_ct = 0;
  var participants = survey.participant;
  console.log(participants[0].score);
  var participants_opt_scores = participants.map((participant) => {
    var participantScores = participant.score;
    participant_ct = survey.participant.length;
    options_ct = participantScores.length;
    return participantScores;
    console.log("participant scores", participantScores);
  });

  var surveyDone = false;
  var min_opt_score = 100;
  var min_opt_score_index = 0;
  var max_opt_score = 0;
  var max_opt_score_index = 0;
  var roundResultsHistory = [];
  var winners = [];
  var winners_ct = 0;
  var secondPlacers_ct = 0;
  var secondPlaceValue = 0;
  var thirdPlaceValue = 0;
  var opt_scores_ttls = new Array(options_ct);
  var opts_to_be_eliminated = [];

  //Perform an initial evaluation to see, if by chance, a winner is apparent at the beginning
    sumOptionScoreTotals();
    checkForWinners();
    
  //Run a series of evaluation steps until a decision is made
  while (!surveyDone){ 
    identifyAllOptionTBEliminated();
    revalueParticipantOptionScores();
    sumOptionScoreTotals();
    checkForWinners();
  }

  //Sum the initial totals for each option across all participants and store in opt_scores_ttls[]
  function sumOptionScoreTotals() {
    //zero out values in opt_scores_ttls[i]
    for (var i=0; i<options_ct; i++) {
      opt_scores_ttls[i] = 0;
    }
    
    for ( i=0; i<options_ct; i++) {
      for (var j=0; j<participant_ct; j++) {
          opt_scores_ttls[i]  =  opt_scores_ttls[i] + participants_opt_scores[j][i];
      }
    }
    
    var tempArry = new Array(options_ct);
    tempArry = opt_scores_ttls.slice();
    roundResultsHistory.push(tempArry);
    console.log("round results history", roundResultsHistory);

   //Find the scores of the lowest and highest scoring non-zero options in the round
    max_opt_score = 0; //initial max value is first element of array
    for (i=0; i<options_ct; i++) {
      if (opt_scores_ttls[i]>max_opt_score) {
          max_opt_score = opt_scores_ttls[i]; 
          max_opt_score_index = i;
      }
    }
    min_opt_score = max_opt_score;  //initial min value is first element of array
    for (i=0; i<options_ct; i++) {
      if (!(opt_scores_ttls[i] === 0) && (opt_scores_ttls[i]<min_opt_score)) {
          min_opt_score = opt_scores_ttls[i]; 
          min_opt_score_index = i;
      }
    }
  } //function sumOptionScoreTotals()

  //Identify the indices of options to be eliminated and push them into opts_to_be_eliminated[]
  function identifyAllOptionTBEliminated(){
    for(var i=0; i<opt_scores_ttls.length; i++)  {
      if (opt_scores_ttls[i] === min_opt_score) {
          opts_to_be_eliminated.push(i);
      }
    }  
  }

  //Revalue each participants' options scores by redistributing points from options being eliminated
  function revalueParticipantOptionScores(){
    for (var i=0; i<participant_ct; i++) {
      //Determine points to redistribute from options identified for elimination
      var points_to_redistribute = 0;
      for (var j=0; j<opts_to_be_eliminated.length; j++){
          var k = opts_to_be_eliminated[j];
          points_to_redistribute = points_to_redistribute + participants_opt_scores[i][k];
          participants_opt_scores[i][k] = 0;
      }
      //proportionately redistribute points from option(s) that are eliminated
      for( j=0; j<options_ct; j++){
          var tempVal = participants_opt_scores[i][j];
          participants_opt_scores[i][j] = tempVal + (points_to_redistribute*(tempVal/(100-points_to_redistribute)));
      }  
    }
  } //function revalueParticipantOptionScores()

  //Check if there is a winner or a tie for winners
  function checkForWinners(){
    //Reinitialize winner variables
    winners = [];
    winners_ct = winners.length;
    secondPlaceValue = 0;
    thirdPlaceValue = 0;
    
    for (var i=0; i<options_ct; i++) {
      if (opt_scores_ttls[i]===max_opt_score) {
        winners.push(i);
        winners_ct++;
      }
      //Find the value of the second placer(s)
      if ((opt_scores_ttls[i]<max_opt_score) && !(opt_scores_ttls[i]===0)) {
        if(opt_scores_ttls[i]>secondPlaceValue){
          secondPlaceValue = opt_scores_ttls[i];
        }
      }
    }

    //Find the value of the third placer(s)  -if there is one
    for ( i=0; i<options_ct; i++) {
      if ((opt_scores_ttls[i]<secondPlaceValue) && !(opt_scores_ttls[i]===0)) {
          if(opt_scores_ttls[i]>thirdPlaceValue){
            thirdPlaceValue  = opt_scores_ttls[i];
          }
      }    
    }
    //Decision not reduced until there are no non-zero third place options
    if(thirdPlaceValue>0){
      surveyDone = false;
    }
    else {
      surveyDone = true;
    }
  }  //function checkForWinners()

  // surveyCalculatedResults.roundResultsHistory = roundResultsHistory;
  return roundResultsHistory;

}  //function wrapper calculateSurveyResults

module.exports = calculateSurveyResults;