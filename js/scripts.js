$(function(){

    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        var i = 0;
        for (i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    function Column(name) {
        var self = this;

        this.id = randomString();
        this.name = name;
        this.element = createColumn();

        function createColumn() {

            var column = $('<div class="column"></div>');
            var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
            var columnCardList = $('<ul class="card-list"></ul>');
            var columnDelete = $('<button class="btn-delete">x</button>');
            var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');


            columnDelete.click(function() {
                self.deleteColumn();
            });
            columnAddCard.click(function(event) {
                event.preventDefault();
                self.createCard(new Card(prompt("Wpisz nazwę karty")));
            });

            column.append(columnTitle)
                .append(columnDelete)
                .append(columnAddCard)
                .append(columnCardList);
            return column;
        }
    }
    Column.prototype = {
        createCard: function(card) {
            this.element.children('ul').append(card.element);
        },
        deleteColumn: function() {
            this.element.remove();
        }
    };

    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.element = createCard();

        function createCard() {
            var card = $('<li class="card"></li>');
            var cardDeleteBtn = $('<button class="btn-delete">x</button>');
            var cardDescription = $('<p class="card-description"></p>');
            cardDeleteBtn.click(function(){
                self.removeCard();
            });
            card.append(cardDeleteBtn);
            cardDescription.text(self.description);
            card.append(cardDescription)
            return card;
        }
    }
    Card.prototype = {
        removeCard: function() {
            this.element.remove();
        }
    };

    var board = {
        name: 'Tablica Kanban',
        createColumn: function(column) {
            this.element.append(column.element);
            initSortable();
        },
        element: $('#board .column-container')
    };

    $('.create-column')
        .click(function(){
            board.createColumn(new Column(prompt('Wpisz nazwę kolumny')));
        });

    function initSortable() {
        $('.card-list').sortable({
            connectWith: '.card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }

    var todoColumn = new Column('Do zrobienia');
    var doingColumn = new Column('W trakcie');
    var doneColumn = new Column('Skończone');

    board.createColumn(todoColumn);
    board.createColumn(doingColumn);
    board.createColumn(doneColumn);

    // var card1 = new Card();
    // var card2 = new Card();


    todoColumn.createCard;
    doingColumn.createCard;

});