// import { waitFor } from '@testing-library/react';
// import { testBundle } from '../../z_tests-helper/testBundle';
// import { Trash } from './Trash';


// const {
//   render,
//   screen,
//   HOC_withProviders,
//   makeFakeStore,
//   UserEvent,
//   fireEvent,
//   storeExamples: { makeAppSlice } } = testBundle;

// describe('Component: Trash', () => {

//   it('Корректно работает drag and drop', async () => {
//     const mockStore = makeFakeStore(makeAppSlice());
//     const TrashWrapped = HOC_withProviders(Trash, mockStore);
//     const spyDispatch = jest.spyOn(mockStore, 'dispatch');

//     const myContainer = document.createElement('section')
//     myContainer.setAttribute('style', 'width:50px; height:50px;')

//     const draggableDiv = document.createElement('div')
//     draggableDiv.setAttribute('draggable', 'true');
//     draggableDiv.setAttribute('data-testid', 'draggable');

//     const { container } = render(TrashWrapped({}), {
//       container: document.body.appendChild(myContainer)
//     });

//     container.appendChild(draggableDiv);
//     screen.debug();

//     const Draggable = screen.getByTestId('draggable');
//     fireEvent.mouseDown(Draggable)
//     fireEvent.mouseMove(container, {
//       clientX: 25,
//       clientY: 25
//     });
//     fireEvent.mouseUp(Draggable);


//     await waitFor(() =>
//       expect(spyDispatch).toBeCalledTimes(1)
//     )
// });

// });

export { };
