import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createAnecdote} from "./requests.js";
import {useNotificationDispatch} from "../NotificationContext.jsx";

const AnecdoteForm = () => {
  const dispatchNotification = useNotificationDispatch();
  const queryClient = useQueryClient()
  const newAnecdote = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes']
      })
    },
    onError: () => {
      dispatchNotification({type: 'update', payload: 'too short anecdote, must have length 5 or more'})
      setTimeout(() => {
        dispatchNotification({type: 'clear'})
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdote.mutate(content)
    dispatchNotification({type: 'update', payload: `new anecdote '${content}' created`})
    setTimeout(() => {
      dispatchNotification({type: 'clear'})
    }, 5000)
  }


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
