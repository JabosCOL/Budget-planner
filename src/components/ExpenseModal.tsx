import { Fragment, useContext, useEffect, useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { Dialog, Transition } from '@headlessui/react'
import { BudgetContext } from '../context/BudgetContext'
import ExpenseForm from './ExpenseForm'

export default function ExpenseModal() {

    const {state, dispatch, available} = useContext(BudgetContext)
    const [insufficientBalanceMessage, setInsufficientBalanceMessage] = useState(false)

    useEffect(() => {
      if (insufficientBalanceMessage) {
        setTimeout(() => {
          setInsufficientBalanceMessage(false)
        }, 4000);
      }
    }, [insufficientBalanceMessage])

  return (
    <>
      {insufficientBalanceMessage && (
        <div className='fixed right-14 bottom-20 animate-bounce'>
          <p className='uppercase p-2 bg-red-500 text-white rounded-lg rounded-br-none font-semibold outline outline-4 outline-red-600'>There's not enough<br/>available balance!</p>
        </div>
      )}
      <div className="fixed right-5 bottom-5 flex items-start justify-center">
        <button
          type="button"
          onClick={() => available <= 0 ? setInsufficientBalanceMessage(true) : dispatch({type: 'open-modal'}) }
        >
          <PlusCircleIcon
            className='w-16 h-16 text-sky-500 rounded-full'
            strokeWidth={1}
            stroke='#0284c7'
          />
        </button>
      </div>

      <Transition appear show={state.modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => dispatch({type: 'close-modal'})}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <ExpenseForm />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}