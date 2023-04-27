import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('Render Blogs ', () => {
    const blog = {
        title: 'Test.JS',
        author: 'Blog Test',
        url: 'Blog.test.js',
        user: 'mluukkai',
        likes: 1
    };

    let deleteBlog = jest.fn();
    let like = jest.fn();


    test('title but not likes and url by default', () => {
        const component = render(
            <Blog blog={ blog } deleteBlog={ deleteBlog } like={ like }/>
        );

        expect(component.container).toHaveTextContent('Test.JS');
        expect(component.container).not.toHaveTextContent('Blog.test.js');
    });

    test('View button was pressed', async () => {
        const component = render(
            <Blog blog={ blog } deleteBlog={ deleteBlog } like={ like }/>
        );

        const user = userEvent.setup();
        const button = screen.getByText('View');
        await user.click(button);

        expect(component.container).toHaveTextContent('Blog.test.js');
        expect(component.container).toHaveTextContent('1');
    });

    test('Like button is pressed twice', async () => {
        const mockHandler = jest.fn();
        render(
            <Blog blog={ blog } deleteBlog={ deleteBlog } like={ mockHandler }/>
        );

        const user = userEvent.setup();

        const viewButton = screen.getByText('View');
        await user.click(viewButton);

        const likeButton = screen.getByText('Like');

        await user.click(likeButton);
        await user.click(likeButton);

        expect(mockHandler.mock.calls).toHaveLength(2);
    });
});