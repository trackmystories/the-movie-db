import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MovieSearch from '@/components/MovieSearch.vue'

describe('SearchComponent', () => {
  it('renders input field', () => {
    const wrapper = mount(MovieSearch)
    expect(wrapper.find('.input').exists()).toBe(true)
  })

  it('updates searchQuery on input', async () => {
    const wrapper = mount(MovieSearch)
    const input = wrapper.find('.input')
    await input.setValue('test query')
    expect(wrapper.vm.searchQuery).toBe('test query')
  })

  it('emits search-applied event on input', async () => {
    const wrapper = mount(MovieSearch)
    const input = wrapper.find('.input')
    await input.setValue('test query')
    expect(wrapper.emitted()['search-applied']).toBeTruthy()
    expect(wrapper.emitted()['search-applied'][0]).toEqual(['test query'])
  })
})
