var ref = new Firebase('https://accountingabc.firebaseio.com/');
var app = angular.module('app', []);

app.controller('General', function ($scope) {
    $scope.entry = {};
    $scope.generalJournal = {};
    $scope.add = function (entry) {
        console.log(entry);
        if (entry.debitTitle === undefined && entry.debitAmount === undefined) {
            console.log("first");
            ref.child('General-Journal').child(entry.date).child(entry.creditTitle).set({

                Credit: entry.creditAmount

            });
            ref.child('Ledger-Posting').child(entry.creditTitle).child(entry.date).set({Credit : entry.creditAmount});
        }
        else if (entry.creditTitle === undefined && entry.creditAmount === undefined) {
            console.log("second");
            ref.child('General-Journal').child(entry.date).child(entry.debitTitle).set({

                Debit: entry.debitAmount

            });
            ref.child('Ledger-Posting').child(entry.debitTitle).child(entry.date).set({Debit : entry.debitAmount});
        }
        else
        {
            console.log("third");
            ref.child('General-Journal').child(entry.date).child(entry.creditTitle).set({

                Credit: entry.creditAmount

            });
            ref.child('Ledger-Posting').child(entry.creditTitle).child(entry.date).set({Credit : entry.creditAmount});
            
            ref.child('General-Journal').child(entry.date).child(entry.debitTitle).set({

                Debit: entry.debitAmount

            });
            ref.child('Ledger-Posting').child(entry.debitTitle).child(entry.date).set({Debit : entry.debitAmount});
            
        }



    }
    ref.child('General-Journal').on('value', function (snapshot) {
        console.log(snapshot.val());
        $scope.generalJournal = snapshot.val();

        $scope.$digest();
    })

});

app.controller('Ledger-Posting',function($scope){
    $scope.ledgerPosting = {};
    
    ref.child('Ledger-Posting').on('value',function(snapshot){
        //console.log(snapshot.val());
        $scope.ledgerPosting = snapshot.val()
       
       $scope.testing = [];
        $scope.testing= snapshot.val();
       console.log("testing" , $scope.testing);
       for(var AccountName in $scope.testing)
       { 
           var InitialCredit = 0; var InitialDebit = 0;
           var TotalCredit = 0; var TotalDebit = 0; var balance=0; 
           console.log(AccountName);
           if($scope.testing.hasOwnProperty(AccountName))
           {
               for(var AccountDate in $scope.testing[AccountName])
               {
                   console.log($scope.testing[AccountName][AccountDate]);
                   if($scope.testing[AccountName][AccountDate].Debit) 
                   {
                       InitialDebit = (InitialDebit) + Number($scope.testing[AccountName][AccountDate].Debit);
                       TotalDebit = InitialDebit
                      
                   }
                   if($scope.testing[AccountName][AccountDate].Credit)
                    {
                        InitialCredit = (InitialCredit) + Number($scope.testing[AccountName][AccountDate].Credit);
                        TotalCredit = InitialCredit
                       
                    }
                    
                    if(TotalDebit>TotalCredit) 
                    {
                        balance = TotalDebit - TotalCredit;
                        $scope.testing[AccountName][AccountDate].DebitBalance = balance;
                        console.log( "Debit" , $scope.testing[AccountName][AccountDate].DebitBalance);
                    }
                    if(TotalDebit<TotalCredit) 
                    {
                        balance =   TotalCredit - TotalDebit;
                        $scope.testing[AccountName][AccountDate].CreditBalance = balance;
                        console.log( "Credit" , $scope.testing[AccountName][AccountDate].CreditBalance);
                    }
                    
               }
           }
       }
       
       $scope.$digest();
    })
});