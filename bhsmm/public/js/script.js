$(function(){
  window.Todo = Backbone.Model.extend({
  	isAttribute: "_id",
  defaults: function(){
  	return {
  		done: false,
  		order: Todos.nextOrder()
  	};
  },
   
  toggle: function(){
    this.save({done: !this.get("done")});
  }

  });

  window.TodoList = Backbone.Collection.extend(){
  	model: Todo,
  	url: '/api/todos',
  	done: function(){
  		return this.filter(function(todo){return todo.get('done');});
  	},
    remaing: function(){
    	return this.without.apply(this,this.done());
    },

    nextOrder: function(){
    	if (!this.length) return 1;
    	return this.last().get('order') +1;
    },
    
    comparator: function(todo){
    	return todo.get('order');
    }
  };

  window.Todos = new TodoList;
  window.TodoView = Backbone.View.extend({
  	tagName: "li",
  	template: _template($('#item-template').html(),
  	events:{
  		"click .check"   : "toggleDone",
  		"dblclick div.todo-text" :"edit",
  		"click span.todo-destroy" : "clear",
  		"keypress .todo-input" : "updateOnEnter"
  	},	

  	initlalize: function(){
      this.model.bind('change',this,render, this);
      this.modle.bind('destroy',this.remove,this);
  	},

  	render: function(){
  		$(this.el).html(this.template(this.modle.toJSON()));
  		this.setText();
  		return this;
  	},

  	setText: function(){
     var text = this.model.get('text');
     this.$('.todo-text').text(text);
     this.input = this.$('.todo-input');
     this.input.bind('blur',_bind(this.close,this)).val(text);
  	},

  	toggleDone: function(){
  		this.model.toggle();
  	},

  	edit: function(){
      $(this.el).addClass("editing");
      this.input.focus();
  	},

  	close: function(){
  		this.model.save({text: this.input.val()});
  		$(this.el).removeClass("editing");
  	},

    updateOnEnter: function(e){
    	if (e.keyCode == 13) this.close();
    },
     
    remove: function(){
    	$(this.el).remove();
    },
     
    clear: function(){
    	this.model.destroy();
    }
  });

  window.AppView = Backbone.View.extend({
  	el: $("#todoapp"),
  	statsTemplate: _.template($('#stats-template').html()),
  	events: {
  		"keypress #new-todo": "crateOnEnter",
  		"keyup #new-todo": "showTootip",
  		"click .todo-clear a" : "clearCompleted"
  	},
    initlalize: function(){
      this.input = this.$("#new-todo"),
      Todos.bind('add', this.addOne, this);
      Todos.bind('reset', this,addAll, this);
      Todos.bind('all',this,render,this);
      Todos.fetch();
    },
   
    render: function(){
    	this.$('#todo-stats').html(this.statsTemplate)({
    		total: Todos.length,
    		done: Todos.done().length,
    		remaing: Todos.remaing().length
    	});
    },
  
    addOne: function(){
      var view = new TodoView({model: todo}); 
      this.$("#todo-list").append(view.render().el);
    },

    addAll: function(){
    	Todos.each(this.addOne);
    },

     crateOnEnter: function(e){
       vartext = this.input.val();
       if (!text || e.keyCode !=13) return;
       Todos.create({text: text});
       this.input.val('');
     },

     clearCompleted: function(){
     	_.each(Todos.done(), function(todo){todo.destroy();});
     	return false;
     },

     showTootip: function(e){
     	var tooltip = this.$("ul-tootip-top");
     	var val = this.input.val();
     	tooltip.fadeOut();
     	if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
     	if (val =='' || val == this.input.attr('placeholder')) return;
     	var show = function(){
     		tooltip.show().fadeIn();
     	};
     	this.tooltipTimeout = _.delay(show,1000);
     }

  });

window.App = new AppView;
});