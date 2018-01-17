function addItem(event){
	event.preventDefault();
	let item = $(this).find('.js-shopping-list-entry').val();
	if (!item) {
		alert('Please enter the name of your item.')
	}
	debugger;
	console.log('Adding item ' + item);
	html = `
      <li>
        <span class="shopping-item">${item}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>
	`
	$('.shopping-list').append(html);
}

function checkItem(event) {
  $(this).closest('li').find('.shopping-item').toggleClass('shopping-item__checked');
}

function deleteItem(event) {
	$(this).closest('li').remove();
}



function main() {
	$('#js-shopping-list-form').submit(addItem);
	$('ul').on('click', '.shopping-item-toggle', checkItem);
	$('ul').on('click', '.shopping-item-delete', deleteItem);
}

$(main);