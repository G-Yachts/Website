import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { clsx } from 'clsx'

import {
  Charter,
  Destination,
  NewConstruction,
  Partner,
  Shipyard,
  User,
  Yacht,
} from '../../payload-types'
import { DragHandle } from './DragHandle'
import { MoveArrows } from './MoveArrows'
import { queryCollection } from './queryCollection'
import reorderList from './reorderList'

import './orderListStyles.css'

export const CustomCollectionList = <
  T extends Yacht | Charter | User | Shipyard | Destination | Partner | NewConstruction,
>(props: {
  collection: {
    fields: {
      label: {
        en: string
        fr: string
      }
      name: string
      type: string
      required: boolean
    }[]
    labels: {
      singular: {
        en: string
        fr: string
      }
      plural: {
        en: string
        fr: string
      }
    }
    slug: string
  }
  newDocumentURL: string
  columns: string[]
  hasCreatePermission: boolean
  titleField: {
    name: string
    label: {
      en: string
      fr: string
    }
  }
  data: any
}) => {
  // Variables and hooks
  const { i18n } = useTranslation()
  const history = useHistory()
  const language = useMemo<'fr' | 'en'>(
    () => (i18n.language === 'fr' ? 'fr' : 'en'),
    [i18n.language],
  )
  const [data, setData] = useState<T[]>([])
  const [query, setQuery] = useState<string>('')
  const fields =
    props.collection.slug === 'charters'
      ? (props.collection.fields[1] as any).tabs[0].fields
      : props.collection.fields

  // Search
  useEffect(() => {
    if (query.length > 0) {
      const timeout = setTimeout(async () => {
        const results = await queryCollection<T>(query, props.collection.slug as any, language)
        setData(results)
      }, 1000)
      return () => clearTimeout(timeout)
    } else {
      fetchData()
    }
  }, [query])

  // Data fetching
  useEffect(() => {
    if (props.data?.limit) fetchData()
  }, [props.data])

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/${props.collection.slug}?limit=${props.data.totalDocs}`, {
        credentials: 'include',
      })
      const responseData = (await response.json()) as { docs: T[] }
      const sortedData = responseData.docs.sort((a, b) => a.indexField - b.indexField)
      setData(sortedData)
    } catch (err) {
      console.error(err)
      toast.error('Failed to fetch data')
    }
  }

  // Drag and drop
  const [dragged, setDragged] = useState<number | null>(null)
  const [mouse, setMouse] = useState<[number, number]>([0, 0])
  const [closestDropZone, setClosestDropZone] = useState<number>(0)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dragged !== null) {
        e.preventDefault()
        setDragged(null)

        setData(items => reorderList<T>(items, dragged, closestDropZone))
      }
    }

    document.addEventListener('mouseup', handler)
    return () => document.removeEventListener('mouseup', handler)
  })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse([e.x, e.y])
    }

    document.addEventListener('mousemove', handler)

    return () => document.removeEventListener('mousemove', handler)
  }, [])

  useEffect(() => {
    if (dragged !== null) {
      const elements = Array.from(document.getElementsByClassName('drop-zone'))
      const positions = elements.map(e => e.getBoundingClientRect().top)
      const absDifferences = positions.map(v => Math.abs(v - mouse[1]))
      let result = absDifferences.indexOf(Math.min(...absDifferences))

      if (result > dragged) result += 1

      setClosestDropZone(result)
    }
  }, [dragged, mouse])

  const move = (direction: 'up' | 'down', index: number) => {
    if (direction === 'up') {
      if (index === 0) return
      setData(items => reorderList<T>(items, index, index - 1))
    } else {
      if (index === data.length - 1) return
      setData(items => reorderList<T>(items, index, index + 2))
    }
  }

  const saveOrder = async () => {
    const mappedList = data.map((item, index) => ({ id: item.id, indexField: index }))
    try {
      const resp = await fetch('/api/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collection: props.collection.slug,
          items: mappedList,
        }),
        credentials: 'include',
      })
      if (!resp.ok) {
        throw new Error('Failed to save order')
      }
      toast.success('Order saved')
      setData([])
    } catch (err) {
      console.error(err)
      toast.error('Failed to save order')
      setData([])
    }
    await fetchData()
  }

  const Row = ({ item, index }) => {
    return (
      <>
        {dragged !== index && (
          <>
            <RowData
              key={item.id}
              onMouseDown={e => {
                if (e.button === 0) {
                  e.preventDefault()
                  setDragged(index)
                  setClosestDropZone(index)
                }
              }}
              item={item}
              index={index}
            />

            <tr
              key={`${item.id}-drop-zone-a`}
              className={clsx(
                `list-item drop-zone`,
                dragged === null || closestDropZone !== index + 1 ? 'hidden' : '',
              )}
              onMouseUp={e => {
                e.preventDefault()

                if (dragged !== null) {
                  setDragged(null)
                }
              }}
            ></tr>
            <tr></tr>
          </>
        )}
      </>
    )
  }

  const RowData = ({ item, index, onMouseDown }) => {
    const url = `/admin/collections/${props.collection.slug}/${item.id}`
    const navigateToItem = e => {
      e.preventDefault()
      history.push(url)
    }
    return (
      <tr>
        <td className={`cell-${props.titleField.name} drag-cell`}>
          {/* Only show move buttons when there is no serach going on */}
          {query.length == 0 && (
            <>
              <span
                style={{
                  marginRight: '10px',
                  color: 'grey',
                  width: '12x',
                }}
              >
                {item.indexField + 1}
              </span>
              <MoveArrows onUp={() => move('up', index)} onDown={() => move('down', index)} />
              <DragHandle onMouseDown={onMouseDown} />
            </>
          )}
          <a href={url} onClick={navigateToItem} style={{ marginLeft: '10px' }}>
            {item[props.titleField.name]}
          </a>
        </td>
        {props.columns.map(column => (
          <td>
            {typeof item[column] == 'object' && props.collection.slug === 'charters'
              ? `${item[column].low} - ${item[column].high}`
              : item[column] !== undefined && item[column].length > 50
              ? item[column].substring(0, 50) + '...'
              : item[column]}
          </td>
        ))}
      </tr>
    )
  }

  return (
    <div className="collection-list collection-list--yachts">
      <div className="gutter--left gutter--right collection-list__wrap">
        <header className="collection-list__header">
          <h1>{props.collection.labels.plural[language]}</h1>
          {props.hasCreatePermission && (
            <a
              className="pill pill--style-light pill--has-link pill--has-action"
              href={props.newDocumentURL}
            >
              <span className="pill__label">Create New</span>
            </a>
          )}
          <a
            className="pill pill--style-light pill--has-link pill--has-action"
            onClick={() => saveOrder()}
            style={{
              float: 'right',
            }}
          >
            <span className="pill__label">Save Order</span>
          </a>
        </header>
        <div className="list-controls">
          <div className="list-controls__wrap">
            <div className="search-filter">
              <input
                className="search-filter__input"
                placeholder={`Search by ${props.titleField.label[language]}`}
                type="text"
                onChange={e => setQuery(e.target.value)}
              />
              <svg
                className="icon icon--search"
                fill="none"
                viewBox="0 0 25 25"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle className="stroke" cx="11.2069" cy="10.7069" r="5"></circle>
                <line className="stroke" x1="14.914" x2="20.5002" y1="13.9998" y2="19.586"></line>
              </svg>
            </div>
            {/* <div className="list-controls__buttons">
              <div className="list-controls__buttons-wrap">
                <button
                  aria-controls="list-controls-columns"
                  aria-expanded="false"
                  className="pill pill--style-light list-controls__toggle-columns  pill--has-action pill--has-icon pill--align-icon-right"
                  type="button"
                >
                  <span className="pill__label">Columns</span>
                  <span className="pill__icon">
                    <svg
                      className="icon icon--chevron"
                      viewBox="0 0 9 7"
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                    >
                      <path
                        className="stroke"
                        d="M1.42871 1.5332L4.42707 4.96177L7.42543 1.5332"
                      ></path>
                    </svg>
                  </span>
                </button>
                <button
                  aria-controls="list-controls-where"
                  aria-expanded="false"
                  className="pill pill--style-light list-controls__toggle-where  pill--has-action pill--has-icon pill--align-icon-right"
                  type="button"
                >
                  <span className="pill__label">Filters</span>
                  <span className="pill__icon">
                    <svg
                      className="icon icon--chevron"
                      viewBox="0 0 9 7"
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                    >
                      <path
                        className="stroke"
                        d="M1.42871 1.5332L4.42707 4.96177L7.42543 1.5332"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div> */}
          </div>
        </div>
        <div className="table">
          <table cellPadding={0} cellSpacing={0}>
            <thead>
              <tr>
                <th>
                  <div className="sort-column">
                    <span className="sort-column__label">{props.titleField.label[language]}</span>
                  </div>
                </th>
                {props.columns.map(column => (
                  <th>
                    <div className="sort-column">
                      <span className="sort-column__label">
                        {fields.find(e => e.name === column).label[language]}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            {dragged !== null && (
              <div
                style={{
                  left: `${mouse[0]}px`,
                  top: `${mouse[1]}px`,
                  position: 'fixed',
                  zIndex: 1000,
                  transform: 'translateY(-50%)',
                }}
              >
                <Row index={99999} item={data[dragged]} />
              </div>
            )}
            <div
              key={`0-drop-zone-a`}
              className={`list-item drop-zone ${
                dragged === null || closestDropZone !== 0 ? 'hidden' : ''
              }`}
            />
            <tbody>
              {data ? data.map((item: any, index: number) => Row({ item, index })) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
