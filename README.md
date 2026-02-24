

# 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Ans: 
→ getElementById : selects one element using its id and returns only that element.
→ getElementsByClassName : selects all elements with the same class name and returns a live HTMLCollection, which means it updates automatically if the DOM changes.
→ querySelector : selects the first element that matches a CSS selector.
→ querySelectorAll : selects all elements that match a CSS selector and returns a static NodeList, which means it does not update automatically when DOM changes.


# 2. How do you create and insert a new element into the DOM?
Ans:
step 1 → create a new element using createElement().
step 2 → add text, class, or attributes to it.
step 3 → select the parent element where you want to place it.
step 4 → insert it into the DOM using appendChild() or other insert methods.


# 3. What is Event Bubbling? And how does it work?
Ans:
Event bubbling means when an event happens on an element, it first runs on that element and then moves upward to its parent, then grandparent, and keeps going until it reaches the document.


# 4. What is Event Delegation in JavaScript? Why is it useful?
Ans:
Event delegation means adding one event listener to a parent element instead of adding listeners to each child element.
The parent listens for events from its children because events move upward in the DOM.

It is useful because:
-> Fewer event listeners are needed
-> Better performance
-> Works for elements added later
-> Easier to manage code


# 5. What is the difference between preventDefault() and stopPropagation() methods?
Ans:
→ preventDefault() : stops the browser’s default behavior
→ stopPropagation() : stops the event from moving up to parent elements