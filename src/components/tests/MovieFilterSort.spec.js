import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MovieFilterSort from '@/components/MovieFilterSort.vue'

describe('SearchFilterComponent', () => {
  it('renders two select dropdowns', () => {
    const wrapper = mount(MovieFilterSort)
    const selects = wrapper.findAll('select')
    expect(selects.length).toBe(2)
  })

  it('populates genre dropdown with options', async () => {
    const wrapper = mount(MovieFilterSort)
    await wrapper.vm.$nextTick()
    const genreOptions = wrapper.find('select').findAll('option')
    expect(genreOptions.length).toBeGreaterThan(1)
  })

  it('emits filter-sort-changed event on genre change', async () => {
    const wrapper = mount(MovieFilterSort)
    const genreSelect = wrapper.find('select')
    await genreSelect.setValue('28')
    expect(wrapper.emitted()['filter-sort-changed']).toBeTruthy()
    const emittedEvent = wrapper.emitted()['filter-sort-changed'][0][0]
    expect(emittedEvent.genre).toBe(28)
    expect(emittedEvent.sort).toBe('')
  })

  it('emits filter-sort-changed event on sort change', async () => {
    const wrapper = mount(MovieFilterSort)
    const sortSelect = wrapper.findAll('select')[1]
    await sortSelect.setValue('popularity.desc')
    expect(wrapper.emitted()['filter-sort-changed']).toBeTruthy()
    expect(wrapper.emitted()['filter-sort-changed'][0][0]).toEqual({
      genre: '',
      sort: 'popularity.desc'
    })
  })
})
