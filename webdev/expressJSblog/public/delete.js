const btns = Array.from(document.getElementsByTagName("button"))
const spans = Array.from(document.getElementsByTagName("span"))

btns.forEach( (e, i) => {
	e.addEventListener("click", _ => {
		fetch('/delete/' + spans[i].textContent, {
			method: 'delete'
		})
		.then(res => {
			if (res.ok) return res.json()
		})
		.then(data => {
			window.location.reload()
		})
	})
})