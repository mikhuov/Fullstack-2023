import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('Render BlogForm ', () => {
    test('title but not likes and url by default', async () => {
        const mockHandler = jest.fn();
        const component = render(
            <BlogForm createBlog={ mockHandler }/>
        );

        const user = userEvent.setup();
        const button = screen.getByText('Create');
        const title = component.container.querySelector('#title');
        const author = component.container.querySelector('#author');
        const url = component.container.querySelector('#url');
        
        await user.type(title, 'BlogForm Test');
        await user.type(author, 'BlogForm Tester');
        await user.type(url, 'BlogForm.test.js');
        await user.click(button);

        expect(mockHandler.mock.calls).toHaveLength(1);
        expect(mockHandler.mock.calls[0][0]).toEqual(
            {
                title: 'BlogForm Test',
                author: 'BlogForm Tester',
                url: 'BlogForm.test.js'
            }
        );
    });
});