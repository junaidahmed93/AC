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
            ref.child('Ledger-Posting').child(entry.debitTitle).child(entry.date).set({Credit : entry.debitAmount});
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
            ref.child('Ledger-Posting').child(entry.debitTitle).child(entry.date).set({Credit : entry.debitAmount});
            
        }



    }
    ref.child('General-Journal').on('value', function (snapshot) {
        console.log(snapshot.val());
        $scope.generalJournal = snapshot.val();

        $scope.$digest();
    })

});

app.controller('Ledger-Posting',function($scope){
    
});