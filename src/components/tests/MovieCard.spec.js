// MovieCard.spec.js

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MovieCard from '@/components/MovieCard.vue' // Adjust the import path based on your project structure

describe('MovieCard.vue', () => {
  const movie = {
    title: 'Example Movie',
    posterPath: '/path/to/poster.jpg',
    popularity: 8.5,
    adult: false,
    releaseDate: '2021-01-01',
    voteAverage: 7.2,
    voteCount: 1200
  }

  it('renders movie information', () => {
    const wrapper = mount(MovieCard, {
      propsData: { movie }
    })
    expect(wrapper.text()).toContain(movie.title)
    expect(wrapper.text()).toContain(`popularity : ${movie.popularity}`)
  })

  it('computes movie image URL correctly', () => {
    const wrapper = mount(MovieCard, {
      propsData: { movie }
    })
    expect(wrapper.vm.movieImageUrl).toBe(`https://image.tmdb.org/t/p/w342${movie.posterPath}`)
  })

  it('emits toggle-favorite event when favorite button is clicked', async () => {
    const wrapper = mount(MovieCard, {
      propsData: { movie, isFavorite: false }
    })
    await wrapper.find('.favorite-button').trigger('click')
    expect(wrapper.emitted('toggle-favorite')).toBeTruthy()
    expect(wrapper.emitted('toggle-favorite')[0]).toEqual([movie])
  })

  it('emits card-clicked event when card click button is clicked', async () => {
    const wrapper = mount(MovieCard, {
      propsData: { movie, showCardClickButton: true }
    })
    await wrapper.find('.click-card').trigger('click')
    expect(wrapper.emitted('card-clicked')).toBeTruthy()
    expect(wrapper.emitted('card-clicked')[0]).toEqual([movie.id])
  })

  it('conditionally shows the card click button', () => {
    const wrapper = mount(MovieCard, {
      propsData: { movie, showCardClickButton: true }
    })
    expect(wrapper.find('.click-card').exists()).toBe(true)
  })

  it('conditionally shows a note', () => {
    const wrapper = mount(MovieCard, {
      propsData: { movie, note: 'Special note about the movie' }
    })
    expect(wrapper.find('.note').text()).toContain('Special note about the movie')
  })
})
